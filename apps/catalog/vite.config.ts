import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
// The build imports course exports, so every new app enters the catalog automatically.
import { generateCatalog } from '../../scripts/generate-catalog.mjs';

const rootDir = fileURLToPath(new URL('../..', import.meta.url));

function automaticCatalog(): Plugin {
  let pending: Promise<unknown> = Promise.resolve();
  const regenerate = () => {
    pending = pending.catch(() => undefined).then(() => generateCatalog({ rootDir }));
    return pending;
  };
  return {
    name: 'tutor-automatic-catalog',
    async config() { await regenerate(); },
    configureServer(server) {
      server.watcher.add(resolve(rootDir, 'apps'));
      const update = (file: string) => {
        if (!file.includes('/src/content/')) return;
        void regenerate().catch((error) => server.config.logger.error(String(error)));
      };
      server.watcher.on('add', update);
      server.watcher.on('change', update);
      server.watcher.on('unlink', update);
    },
  };
}

export default defineConfig({
  plugins: [automaticCatalog(), react(), tailwindcss()],
  build: { outDir: 'dist' },
  server: {
    // Run wrangler dev alongside Vite when working on the admin API locally.
    proxy: { '/api': 'http://127.0.0.1:8787' },
  },
});
