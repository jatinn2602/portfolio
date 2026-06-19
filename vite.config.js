import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// Custom plugin to mock the /api/send serverless handler in local Vite dev server
const localApiPlugin = (env) => ({
  name: 'vite-plugin-local-api',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      // Intercept local POST requests to /api/send
      if (req.url === '/api/send' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const { name, email, service, message } = JSON.parse(body);

            // Basic validation
            if (!name || !email || !message) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Name, email, and message are required fields.' }));
              return;
            }

            const apiKey = env.RESEND_API_KEY;
            const toEmail = env.TO_EMAIL || 'your-gmail@gmail.com';

            if (!apiKey) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                error: 'RESEND_API_KEY is not defined in your local environment. Create a .env file with RESEND_API_KEY.'
              }));
              return;
            }

            // Forward the email to Resend's REST endpoint from the Node dev process
            const response = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
              },
              body: JSON.stringify({
                from: 'Portfolio Contact <onboarding@resend.dev>',
                to: toEmail,
                subject: `New Portfolio Message from ${name}`,
                html: `
                  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 12px;">
                    <h2 style="color: #06B6D4; font-size: 20px; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">
                      New Portfolio Form Submission (Local Dev)
                    </h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                      <tr style="border-bottom: 1px solid #eaeaea;">
                        <td style="padding: 10px 0; font-weight: bold; width: 120px; font-size: 14px;">Name:</td>
                        <td style="padding: 10px 0; font-size: 14px;">${name}</td>
                      </tr>
                      <tr style="border-bottom: 1px solid #eaeaea;">
                        <td style="padding: 10px 0; font-weight: bold; font-size: 14px;">Email:</td>
                        <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${email}">${email}</a></td>
                      </tr>
                      <tr style="border-bottom: 1px solid #eaeaea;">
                        <td style="padding: 10px 0; font-weight: bold; font-size: 14px;">Service Interest:</td>
                        <td style="padding: 10px 0; font-size: 14px;">${service || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; font-weight: bold; font-size: 14px; vertical-align: top;">Message:</td>
                        <td style="padding: 10px 0; font-size: 14px; line-height: 1.5; white-space: pre-wrap;">${message}</td>
                      </tr>
                    </table>
                  </div>
                `
              })
            });

            const data = await response.json();

            res.statusCode = response.status;
            res.setHeader('Content-Type', 'application/json');
            if (!response.ok) {
              res.end(JSON.stringify({ error: data.message || 'Failed to dispatch email via Resend.' }));
            } else {
              res.end(JSON.stringify({ success: true, id: data.id }));
            }
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: `Internal Server Error: ${err.message}` }));
          }
        });
        return;
      }
      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables (loads .env, .env.local etc.)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss(), localApiPlugin(env)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      }
    }
  }
})
