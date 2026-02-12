# Architecture Overview – Squeegee Samurai

## Purpose
This application supports **public quote / estimate submissions** for a service business.

Primary capabilities:
- Accept residential and commercial estimate form input from site visitors
- Compute pricing estimates (residential: live calculator; commercial: contact-based)
- Generate branded PDF quotes
- Store leads in database
- Email customer with PDF quote + notify business owner

Authentication, user accounts, and dashboards are **out of scope for MVP**.
> Note: Frontend UI components (Login, Dashboard) exist as placeholders but are currently non-functional. Future implementation will leverage **Supabase Auth**.

---

## High-Level Architecture

```
Frontend (Static SPA)
  → Vercel Serverless API
    → PostgreSQL (Supabase)
    → PDF Generation (@react-pdf/renderer)
    → Supabase Storage (private bucket)
    → Resend (transactional email)
```

---

## Frontend
### Stack
- React (TypeScript)
- Vite
- React Router
- Tailwind CSS
- Lucide React

### Responsibilities
- Render UI and routes
- Collect estimate form data (residential calculator + commercial form)
- Call backend API
- Display quote result / success state

### Notes
- Frontend is static and hosting-agnostic
- No secrets or database access
- No client-side email (EmailJS removed)

---

## Backend API
### Stack
- Node.js 18+ (TypeScript)
- Express (local dev in `api/`)
- Vercel serverless functions (production in `api-serverless/`)
- `@react-pdf/renderer` (PDF generation)
- Resend (transactional email)
- `@supabase/supabase-js` (storage client)

### API Surface
- `POST /api/quote` — Submit quote request
- `POST /api/contact` — Generic contact form submission
- `POST /api/career` — Job application submission
- `GET /api/health` — Liveness check
- `GET /api/test-pdf` — Dev-only: render sample PDF

### Responsibilities
- Validate incoming form data
- Recompute quote server-side (authoritative)
- Persist lead to database
- Generate branded PDF estimate
- Upload PDF to Supabase Storage
- Email customer with signed PDF link (Resend)
- Email owner with lead notification + PDF link (Resend)
- Return structured response

### Quote Submission Flow
1. Validate request body
2. Compute quote total and breakdown
3. Insert row into `quotes` table
4. Generate PDF from React template → Buffer
5. Upload Buffer to Supabase Storage (`quotes/{year}/{id}.pdf`)
6. Create time-limited signed URL
7. Send customer email with PDF link (Resend)
8. Send owner notification email (Resend)
9. Update DB row with PDF/email metadata
10. Return `201` with quote ID and total

> PDF/email failures do not block the quote save — the lead is preserved regardless.

### Explicitly Excluded
- Authentication
- Sessions / JWT
- User models
- Roles / permissions

---

## Data Layer
### Database
- PostgreSQL (hosted on Supabase)

### Storage
- Supabase Storage — private `quotes` bucket
- PDFs stored at `{year}/{quoteId}.pdf`
- Access via time-limited signed URLs (default 72h expiry)

### Access Pattern
- Database and storage accessed **only server-side**
- No direct client writes
- Portable schema (standard Postgres)

### Core Table: `quotes`
Stores:
- Contact info (name, email, phone, address)
- Service metadata (segment, service type, property type)
- Raw form input (JSONB)
- Quote breakdown (JSONB)
- Quote total
- Status (new → contacted → scheduled → closed)
- PDF metadata (path, generation timestamp, status)
- Email metadata (sent timestamp, status, error log)

See [schema.md](./schema.md) for full column definitions.

---

## Email
- **Provider**: Resend (API key driven)
- **Customer email**: Branded HTML with signed PDF download link
- **Owner email**: Lead notification with quote details + PDF link
- **General/Career**: Contact forms and job applications sent to owner
- Server-side only; triggered after successful quote/form submission

---

## PDF Generation
- **Library**: `@react-pdf/renderer`
- **Template**: React components defining a Japanese-minimalist branded layout
- **Output**: PDF Buffer (no file system writes)
- **Storage**: Uploaded to private Supabase Storage bucket
- **Delivery**: Signed URL included in customer email
- **Assets**: Logo embedded as local file (no external image fetches)

See [PDF implementation docs](./pdf-implimentation/pdf-implementation-complete.md) for details.

---

## Hosting Model
### Target
- Frontend: Vercel (static SPA)
- API: Vercel Serverless Functions (Node.js runtime)
- Database: Supabase Postgres
- Storage: Supabase Storage

### Configuration
- `vercel.json` at repo root configures build, output directory, and routes
- All secrets and config via Vercel environment variables
- No provider lock-in in application code

### Key Constraint
Architecture must remain **independent of hosting providers**.
No cPanel-specific or vendor-locked dependencies.

---

## Directory Structure
```
squeegee-samurai/
├── frontend/           # React SPA (Vite)
├── api/                # Express API (local dev)
│   └── src/
│       ├── pdf/        # PDF template + assets
│       ├── services/   # pdfService, email
│       └── ...
├── api-serverless/     # Vercel serverless functions (production)
├── docs/               # Architecture, schema, workflow docs
├── vercel.json         # Vercel deployment config
└── scripts/            # Utilities (sitemap generation, etc.)
```

---

## Design Principles
- Stateless backend
- Environment-variable driven configuration
- Minimal API surface
- Easy migration across hosting providers
- Security by omission (no auth surface area for MVP)
- Error isolation (PDF/email failures don't block lead capture)