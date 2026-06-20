// Core mail sending function
async function sendMail(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const { name, email, service, message } = body || {};

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.TO_EMAIL || 'your-gmail@gmail.com';

  if (!apiKey) {
    return res.status(500).json({
      error: 'Resend API Key is not configured on the server. Please check your environment variables.'
    });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        // For free Resend accounts, you must send FROM onboarding@resend.dev
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: toEmail,
        subject: `New Portfolio Message from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 12px;">
            <h2 style="color: #06B6D4; font-size: 20px; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">
              New Portfolio Contact Form Submission
            </h2>
            <p style="font-size: 14px; color: #555;">
              Someone filled out the contact form on your portfolio website.
            </p>
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

    const responseData = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: responseData.message || 'Failed to dispatch email via Resend.'
      });
    }

    return res.status(200).json({ success: true, id: responseData.id });
  } catch (error) {
    return res.status(500).json({ error: `Internal Server Error: ${error.message}` });
  }
}

// Unified export handler that automatically detects the runtime environment (Vercel vs. Netlify)
export default async function unifiedHandler(req, res) {
  // If `res` is passed and has a `status` function, it is Vercel/Express runtime
  if (res && typeof res.status === 'function') {
    await sendMail(req, res);
    return;
  }

  // Otherwise, we are in Netlify/AWS Lambda runtime (where req=event, res=context)
  const event = req;
  const mockReq = {
    method: event.httpMethod,
    body: event.body ? (typeof event.body === 'string' ? JSON.parse(event.body) : event.body) : {}
  };

  let statusCode = 200;
  let responseBody = {};
  
  const mockRes = {
    status(code) {
      statusCode = code;
      return this;
    },
    json(data) {
      responseBody = data;
      return this;
    }
  };

  await sendMail(mockReq, mockRes);

  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(responseBody)
  };
}

// Named export for Netlify to match standard serverless invocation
export const handler = unifiedHandler;
