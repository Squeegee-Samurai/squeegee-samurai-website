-- Squeegee Samurai – quotes table (PostgreSQL)
-- Run once in Supabase SQL editor or your Postgres client.

CREATE TABLE IF NOT EXISTS quotes (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),

  first_name        TEXT NOT NULL,
  last_name         TEXT NOT NULL,
  email             TEXT NOT NULL,
  phone             TEXT,
  address           TEXT,
  city              TEXT,
  zip_code          TEXT,

  property_type     TEXT,
  service_type      TEXT,
  segment           TEXT,

  form_input        JSONB NOT NULL DEFAULT '{}',
  quote_breakdown   JSONB NOT NULL DEFAULT '{}',
  quote_total_cents INT NOT NULL,
  currency          TEXT NOT NULL DEFAULT 'USD',

  image_urls        TEXT[],
  status            TEXT NOT NULL DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes (status);
CREATE INDEX IF NOT EXISTS idx_quotes_email ON quotes (email);
