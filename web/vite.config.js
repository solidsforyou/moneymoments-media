import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const page = p => resolve(import.meta.dirname, p);
export default defineConfig({
  build: {
    outDir: 'dist',
    target: 'es2022',
    rollupOptions: { input: { ose: page('index.html'), tomorrow: page('tomorrow/index.html'), openprep: page('openprep/index.html'), goodhabit: page('goodhabit/index.html'), admin: page('admin/index.html'), build: page('build/index.html'), privacy: page('privacy/index.html'), deletedata: page('delete-data/index.html'), notfound: page('404.html'), learn: page('openprep/learn/index.html'), mock: page('openprep/mock/index.html'), sim: page('goodhabit/sim/index.html'), arena: page('arena/index.html') } },
  },
});
