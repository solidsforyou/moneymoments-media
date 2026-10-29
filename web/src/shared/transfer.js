// Moving files: uploads in 4 MB pieces (resumes a failed piece once), a small preview image
// for photos and videos, and downloads stitched back together in the browser.
const CHUNK = 4 * 1024 * 1024;
async function req(url, opts) { const r = await fetch(url, { credentials: 'same-origin', ...opts }); const d = r.headers.get('content-type')?.includes('json') ? await r.json() : null; if (!r.ok) throw new Error(d?.error || `Upload failed (${r.status}).`); return d; }

function putWithProgress(url, blob, onProgress) {
  return new Promise((ok, no) => { const x = new XMLHttpRequest(); x.open('PUT', url); x.upload.onprogress = e => e.lengthComputable && onProgress(e.loaded); x.onload = () => x.status < 300 ? ok() : no(new Error('A piece failed to upload.')); x.onerror = () => no(new Error('No connection.')); x.send(blob); });
}
export async function uploadFile(file, onProgress = () => {}) {
  if (file.size <= CHUNK) {
    const d = await new Promise((ok, no) => { const x = new XMLHttpRequest(); x.open('POST', '/api/files'); x.setRequestHeader('x-file-name', encodeURIComponent(file.name)); x.setRequestHeader('content-type', file.type || 'application/octet-stream'); x.upload.onprogress = e => e.lengthComputable && onProgress(e.loaded / e.total); x.onload = () => { let r = {}; try { r = JSON.parse(x.responseText); } catch {} x.status < 300 ? ok(r) : no(new Error(r.error || 'Upload failed.')); }; x.onerror = () => no(new Error('No connection.')); x.send(file); });
    return d.file;
  }
  const init = await req('/api/files', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: file.name, type: file.type, size: file.size }) });
  let sent = 0;
  for (let i = 0; i < init.chunks; i++) {
    const part = file.slice(i * init.chunkSize, (i + 1) * init.chunkSize);
    const go = () => putWithProgress(`/api/files/${init.id}/chunk/${i}`, part, l => onProgress((sent + l) / file.size));
    try { await go(); } catch { await go(); }   // one retry per piece
    sent += part.size; onProgress(sent / file.size);
  }
  return (await req(`/api/files/${init.id}/done`, { method: 'POST' })).file;
}

// a 480px JPEG preview for photos and videos, made on the device before sending
export async function makeThumb(file) {
  try {
    let src, w, h; const url = URL.createObjectURL(file);
    if (file.type.startsWith('image/')) { src = await new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = url; }); w = src.naturalWidth; h = src.naturalHeight; }
    else if (file.type.startsWith('video/')) { src = await new Promise((ok, no) => { const v = document.createElement('video'); v.muted = true; v.playsInline = true; v.preload = 'auto'; v.onloadeddata = () => { v.currentTime = Math.min(1, (v.duration || 2) / 4); }; v.onseeked = () => ok(v); v.onerror = no; v.src = url; setTimeout(() => no(new Error('timeout')), 6000); }); w = src.videoWidth; h = src.videoHeight; }
    else return null;
    const k = Math.min(1, 480 / Math.max(w, h)), c = document.createElement('canvas'); c.width = Math.round(w * k); c.height = Math.round(h * k);
    c.getContext('2d').drawImage(src, 0, 0, c.width, c.height); URL.revokeObjectURL(url);
    const blob = await new Promise(ok => c.toBlob(ok, 'image/jpeg', .8)); if (!blob) return null;
    return { blob: new File([blob], 'preview.jpg', { type: 'image/jpeg' }), ratio: c.width / c.height };
  } catch { return null; }
}

export async function fetchFile(id, onProgress = () => {}) {
  const meta = await req(`/api/files/${id}/meta`), parts = [];
  for (let i = 0; i < meta.chunks; i++) { const r = await fetch(`/api/files/${id}/chunk/${i}`, { credentials: 'same-origin' }); if (!r.ok) throw new Error('Download failed.'); parts.push(await r.blob()); onProgress((i + 1) / meta.chunks); }
  return { blob: new Blob(parts, { type: meta.type }), meta };
}
export async function saveFile(id, onProgress) {
  const { blob, meta } = await fetchFile(id, onProgress), url = URL.createObjectURL(blob), a = document.createElement('a');
  a.href = url; a.download = meta.name; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 60000);
}
