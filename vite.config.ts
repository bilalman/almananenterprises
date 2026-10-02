import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

const devApiMockPlugin = (): Plugin => ({
  name: 'dev-api-mock',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.method === 'POST' && req.url) {
        if (req.url.startsWith('/api/contact.php') || req.url.startsWith('/api/apply.php')) {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          res.end(
            JSON.stringify({
              success: true,
              message: req.url.includes('apply')
                ? 'Registration received successfully. Candidate profile recorded.'
                : 'Thank you. Your inquiry has been submitted successfully.'
            })
          );
          return;
        }
      }
      next();
    });
  }
});

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), devApiMockPlugin()],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
