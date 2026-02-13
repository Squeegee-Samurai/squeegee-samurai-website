export default async function handler(req, res) {
  const diagnostics = {
    ok: true,
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_URL: process.env.DATABASE_URL ? '✅ SET' : '❌ MISSING',
      RESEND_API_KEY: process.env.RESEND_API_KEY ? '✅ SET' : '❌ MISSING',
      SUPABASE_URL: process.env.SUPABASE_URL ? '✅ SET' : '❌ MISSING',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ SET' : '❌ MISSING',
      FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN || '(not set)',
      NODE_ENV: process.env.NODE_ENV || '(not set)',
    },
    imports: {}
  };

  // Test imports
  try {
    const { pool } = await import('../lib/db.js');
    diagnostics.imports.db = '✅ OK';
    
    // Test DB connection
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT 1 as test');
      client.release();
      diagnostics.imports.dbConnection = '✅ Connected';
    } catch (e) {
      diagnostics.imports.dbConnection = '❌ ' + e.message;
    }
  } catch (e) {
    diagnostics.imports.db = '❌ ' + e.message;
  }

  try {
    await import('../lib/quoteLogic.js');
    diagnostics.imports.quoteLogic = '✅ OK';
  } catch (e) {
    diagnostics.imports.quoteLogic = '❌ ' + e.message;
  }

  try {
    await import('../lib/email.js');
    diagnostics.imports.email = '✅ OK';
  } catch (e) {
    diagnostics.imports.email = '❌ ' + e.message;
  }

  try {
    await import('../lib/services/pdfService.js');
    diagnostics.imports.pdfService = '✅ OK';
  } catch (e) {
    diagnostics.imports.pdfService = '❌ ' + e.message;
  }

  res.status(200).json(diagnostics);
}
