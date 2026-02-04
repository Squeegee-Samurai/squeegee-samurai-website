# Database Schema – Squeegee Samurai

Portable PostgreSQL. Apply in Supabase SQL editor or any Postgres client.

---

## Table: `quotes`

Stores each quote submission for leads and owner follow-up.

```sql
CREATE TABLE IF NOT EXISTS quotes (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Contact (denormalized for display)
  first_name        TEXT NOT NULL,
  last_name         TEXT NOT NULL,
  email             TEXT NOT NULL,
  phone             TEXT,
  address           TEXT,
  city              TEXT,
  zip_code          TEXT,

  -- Service metadata
  property_type     TEXT,
  service_type      TEXT,
  segment           TEXT,  -- 'residential' | 'commercial'

  -- Raw form input (flexible; can add fields without migrations)
  form_input        JSONB NOT NULL DEFAULT '{}',

  -- Quote computed server-side
  quote_breakdown   JSONB NOT NULL DEFAULT '{}',  -- e.g. { "subtotal", "discount", "total" }
  quote_total_cents INT NOT NULL,
  currency          TEXT NOT NULL DEFAULT 'USD',

  -- Optional: image URLs from uploads
  image_urls        TEXT[],

  -- Status for owner workflow (optional)
  status            TEXT NOT NULL DEFAULT 'new'  -- e.g. 'new' | 'contacted' | 'scheduled' | 'closed'
);

-- Index for listing by date and status
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes (status);
CREATE INDEX IF NOT EXISTS idx_quotes_email ON quotes (email);
```

---

## Notes
- No user/account tables for MVP.
- All access server-side only; no direct client DB access.
