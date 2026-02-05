# Development Workflow – Squeegee Samurai

## Environments
- **Local** – developer machine (frontend + API + local or hosted Postgres)
- **Preview** – Vercel preview deployments (frontend + serverless API; Supabase or env DB)
- **Production** – client-owned infrastructure (Vercel + Supabase, or equivalent)

---

## Local Development

### Frontend
```bash
cd frontend
npm install
npm run dev
```
- App: **http://localhost:5173**

### Backend API
```bash
cd api
npm install
cp .env.example .env   # set DATABASE_URL, EMAIL_* (or use Supabase local)
npm run dev
```
- API: **http://localhost:3000** (or port in `.env`)

### Database (local options)
- **Supabase local**: `supabase start` (see Supabase CLI)
- **Docker Postgres**: run Postgres and set `DATABASE_URL`
- **Supabase cloud**: use project connection string in `.env` (no local DB required)

### Full stack
1. Start API: `cd api && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Open http://localhost:5173 and submit a quote (form posts to API)

---

## Environment Variables

### API (`api/.env`)
| Variable | Purpose |
|----------|---------|
| `PORT` | Server port (default 3000) |
| `DATABASE_URL` | Postgres connection string (Supabase or other) |
| `EMAIL_*` | SMTP or transactional email config (see api README) |
| `FRONTEND_ORIGIN` | Allowed CORS origin (e.g. http://localhost:5173) |

### Frontend
- No secrets. API base URL can be env (e.g. `VITE_API_URL`) for preview/prod.

---

## Deployment

- **Frontend**: Vercel – build `frontend/`, output `dist`, root `frontend`.
- **API**: Vercel serverless (e.g. `api/` as serverless functions) or Supabase Edge Functions.
- **Database**: Supabase Postgres (preferred).
- Keep config in env vars; no provider lock-in in code.