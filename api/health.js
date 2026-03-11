export default async function handler(req, res) {
  const diagnostics = {
    ok: true,
    timestamp: new Date().toISOString(),
    env: {
      RESEND_API_KEY: process.env.RESEND_API_KEY ? '✅ SET' : '❌ MISSING',
      OWNER_EMAIL: process.env.OWNER_EMAIL ? '✅ SET' : '❌ MISSING',
      ENABLE_CUSTOMER_CONFIRMATION: process.env.ENABLE_CUSTOMER_CONFIRMATION || '(not set)',
      NODE_ENV: process.env.NODE_ENV || '(not set)',
    },
    imports: {}
  };

  try {
    await import('../lib/email.js');
    diagnostics.imports.email = '✅ OK';
  } catch (e) {
    diagnostics.imports.email = '❌ ' + e.message;
  }

  res.status(200).json(diagnostics);
}
