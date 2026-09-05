import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import contactHandler from './api/contact.js';

function contactApiPlugin() {
  return {
    name: 'local-contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (request, response) => {
        if (request.method === 'POST') {
          let rawBody = '';
          for await (const chunk of request) rawBody += chunk;

          try {
            request.body = rawBody ? JSON.parse(rawBody) : {};
          } catch {
            response.statusCode = 400;
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify({ error: 'Invalid JSON payload' }));
            return;
          }
        }

        const apiResponse = {
          statusCode: 200,
          setHeader(name, value) {
            response.setHeader(name, value);
          },
          status(code) {
            this.statusCode = code;
            return this;
          },
          json(payload) {
            response.statusCode = this.statusCode;
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(payload));
          },
        };

        await contactHandler(request, apiResponse);
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [react(), contactApiPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Keep the animation libraries in their own chunk so the first paint stays light.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion', 'gsap', 'lenis'],
        },
      },
    },
  },
  };
});
