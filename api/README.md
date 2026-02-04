# Squeegee Samurai API

Stateless quote submission API: validate form data, compute quote, store in Postgres, notify owner by email.

## Setup

1. **Install**: `npm install`
2. **Env**: `cp .env.example .env` and set:
   - `DATABASE_URL` – Postgres connection string (Supabase or local)
   - `FRONTEND_ORIGIN` – e.g. `http://localhost:5173`
   - Optional: `NOTIFY_EMAIL`, `SMTP_*` for owner email
3. **Database**: Run `schema.sql` in your Postgres (Supabase SQL editor or `psql`).

## Run

- **Dev**: `npm run dev` (http://localhost:3000)
- **Prod**: `npm run build && npm start`

## Endpoints

- `POST /api/quote` – submit quote (see `context/api-contract.md`)
- `GET /api/health` – health check

## Email

If `NOTIFY_EMAIL` is set, the app logs the notification body. To send real email, add `nodemailer` and implement sending in `src/email.ts`, or switch to Resend/SendGrid.
