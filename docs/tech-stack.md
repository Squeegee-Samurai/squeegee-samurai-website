# Tech Stack – Squeegee Samurai

Aligned with [architecture.md](./architecture.md) and [dev_workflow.md](./dev_workflow.md).

---

## Frontend
| Layer      | Choice           | Notes                          |
|-----------|-------------------|--------------------------------|
| Framework | React (TypeScript)| UI and routing                 |
| Build     | Vite              | Dev server + production build  |
| Routing   | React Router      | Client-side routes             |
| Styling   | Tailwind CSS      | Utility-first CSS              |
| Icons     | Lucide React      |                                |

- Static, hosting-agnostic. No DB or secrets.
- Quote forms submit to backend API (EmailJS removed).

---

## Backend API
| Layer       | Choice                 | Notes                                    |
|-------------|------------------------|------------------------------------------|
| Runtime     | Node.js 18+            |                                          |
| Language    | TypeScript             |                                          |
| Server      | Express (local dev)    | Vercel serverless in production          |
| DB client   | `pg`                   | Postgres only                            |
| PDF         | `@react-pdf/renderer`  | Server-side PDF generation               |
| Email       | Resend                 | Transactional email API                  |
| Storage     | Supabase Storage       | Private bucket for PDF hosting           |

- Local dev: Express server in `api/` (`npm run dev`)
- Production: Vercel serverless routes in `api-serverless/`
- API surface: `POST /api/quote`, `POST /api/contact`, `POST /api/career`, `GET /api/health`
- No auth, sessions, or user/role models for MVP.

---

## Data
| Layer    | Choice     | Notes                          |
|----------|------------|--------------------------------|
| Database | PostgreSQL | Hosted on Supabase             |
| Storage  | Supabase Storage | Private `quotes` bucket for PDFs |
| Schema   | `quotes` table | See [schema.md](./schema.md)  |

- Database and storage accessed only server-side; no direct client access.

---

## Email
| Provider | Purpose                         |
|----------|---------------------------------|
| Resend   | Customer quote PDF delivery     |
| Resend   | Owner lead notification         |

- Server-side only. API key driven.
- Customer receives branded email with signed PDF link.
- Owner receives lead notification with quote details + PDF link.
- Owner receives generic contact inquiries and job applications.

---

## PDF Generation
| Component | Choice               | Notes                           |
|-----------|----------------------|---------------------------------|
| Library   | `@react-pdf/renderer`| React components → PDF buffer   |
| Storage   | Supabase Storage     | Private bucket, signed URLs     |
| Delivery  | Resend email         | Link-based (not attachment)     |

- PDFs generated server-side as Buffer (no external image fetches).
- Uploaded to private Supabase Storage bucket (`quotes`).
- Time-limited signed URLs (default 72 hours).
- See [pdf-implementation](./pdf-implimentation/pdf-implementation-complete.md) for full details.

---

## Hosting
| Component | Target              | Alternative        |
|-----------|---------------------|--------------------|
| Frontend  | Vercel (static)     | —                  |
| API       | Vercel Serverless   | Supabase Edge Fns  |
| Database  | Supabase Postgres   | Any Postgres       |
| Storage   | Supabase Storage    | Any S3-compatible  |

- Config via env vars; no provider lock-in in code.
- `vercel.json` at repo root configures build and routing.

---

## Out of Scope (MVP)
- **User login/signup**: Not needed for quote submission.
- **CRM / dashboard**: Owner manages leads externally.
- **Scheduling / invoicing / payments**: Future scope.
