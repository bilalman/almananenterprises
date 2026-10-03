import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

const devApiMockPlugin = (): Plugin => ({
  name: 'dev-api-mock',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      // Handle user-uploaded PNG files saved as logo.svg or favicon.svg
      if (req.url && (req.url.startsWith('/logo.svg') || req.url.startsWith('/favicon.svg') || req.url.startsWith('/favicon.ico'))) {
        const cleanUrl = req.url.split('?')[0].replace(/^\//, '');
        const filePath = path.resolve('public', cleanUrl);
        if (fs.existsSync(filePath)) {
          const buffer = fs.readFileSync(filePath);
          if (buffer.length > 8 && buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
            res.setHeader('Content-Type', 'image/png');
            res.setHeader('Content-Length', buffer.length);
            res.setHeader('Cache-Control', 'no-cache');
            res.statusCode = 200;
            res.end(buffer);
            return;
          }
        }
      }

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
