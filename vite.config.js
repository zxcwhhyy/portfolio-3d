import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nexus: resolve(__dirname, 'demos/nexus/index.html'),
        spatial: resolve(__dirname, 'demos/spatial/index.html'),
        finflow: resolve(__dirname, 'demos/finflow/index.html'),
        synapse: resolve(__dirname, 'demos/synapse/index.html')
      },
      output: {
        manualChunks: {
          three: ['three']
        }
      }
    }
  }
});
