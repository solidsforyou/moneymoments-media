# Cut a product out of a white studio background: flood the white from the borders, soft edge, defringe.
import sys, numpy as np
from PIL import Image, ImageDraw, ImageFilter
src, out, tol = sys.argv[1], sys.argv[2], int(sys.argv[3])
im = Image.open(src).convert('RGB'); a = np.asarray(im).astype(np.float32)
mn = a.min(axis=2)
bgish = (mn >= 255 - tol).astype(np.uint8) * 255
m = Image.fromarray(bgish, 'L').copy(); W, H = m.size
for x in range(0, W, 16):
    for y in (0, H - 1):
        if m.getpixel((x, y)) == 255: ImageDraw.floodfill(m, (x, y), 128)
for y in range(0, H, 16):
    for x in (0, W - 1):
        if m.getpixel((x, y)) == 255: ImageDraw.floodfill(m, (x, y), 128)
bg = (np.asarray(m) == 128)
# grow the background by 1px into the antialiased rim, then feather
bgimg = Image.fromarray((bg * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3))
alpha = 255 - np.asarray(bgimg.filter(ImageFilter.GaussianBlur(1.2))).astype(np.float32)
al = np.clip(alpha / 255, 0, 1)[..., None]
# defringe: remove the white the rim was blended with
rgb = np.where(al > 0.02, (a - (1 - al) * 255) / np.maximum(al, 0.02), 0)
rgb = np.clip(rgb, 0, 255)
o = np.dstack([rgb, al[..., 0] * 255]).astype(np.uint8)
Image.fromarray(o, 'RGBA').crop(Image.fromarray(o[..., 3]).getbbox()).save(out)
print(out, 'bg share %.2f' % bg.mean())
