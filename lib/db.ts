import pg from 'pg';

let connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.warn('DATABASE_URL not set; quote persistence will fail. Set it for local or use Supabase.');
}

// Supabase uses a cert that Node doesn't trust; connection string sslmode=require can override our ssl option.
// Strip sslmode so our ssl config is used (rejectUnauthorized: false for Supabase).
if (connectionString?.includes('supabase.co')) {
  connectionString = connectionString.replace(/[?&]sslmode=[^&]*/g, '').replace(/\?$/, '') || connectionString;
}

const isLocal =
  connectionString?.includes('localhost') || connectionString?.includes('127.0.0.1');

export const pool = new pg.Pool({
  connectionString,
  ssl: isLocal ? false : { rejectUnauthorized: false },
});
