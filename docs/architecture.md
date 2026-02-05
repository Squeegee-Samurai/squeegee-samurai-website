# Architecture Overview – Squeegee Samurai

## Purpose
This application supports **public quote / estimate submissions** for a service business.

Primary capabilities:
- Accept form input from site visitors
- Compute estimates server-side
- Store leads
- Notify the business owner via email

Authentication, user accounts, and dashboards are intentionally **out of scope for MVP**.

---

## High-Level Architecture

Frontend (Static)
→ Backend API (Stateless)
→ PostgreSQL Database
→ Email Notification

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
- Collect estimate form data
- Call backend API
- Display quote result / success state

### Notes
- Frontend is static and hosting-agnostic
- No secrets or database access
- No client-side email (EmailJS will be removed)

---

## Backend API
### Stack
- Node.js (TypeScript preferred)
- Express **or** Serverless API handler

### API Surface
- `POST /api/quote`
- Optional: `GET /api/health`

### Responsibilities
- Validate incoming form data
- Recompute quote server-side (authoritative)
- Persist lead to database
- Send owner notification email
- Return structured response

### Explicitly Excluded
- Authentication
- Sessions / JWT
- User models
- Roles / permissions
- Spring Boot / Java stack (legacy `backend/`; new API in `api/`)

---

## Data Layer
### Database
- PostgreSQL
- Hosted via Supabase (preferred)

### Access Pattern
- Database accessed **only server-side**
- No direct client writes
- Portable schema (standard Postgres)

### Core Table: `quotes`
Stores:
- Contact info
- Service metadata
- Raw form input (JSON)
- Quote breakdown (JSON)
- Quote total
- Status

---

## Email
- Server-side only
- SMTP or transactional email provider
- Triggered on successful quote submission

---

## Hosting Model
### Target
- Frontend: Vercel (static)
- Backend:
  - Vercel API Routes **or**
  - Supabase Edge Functions
- Database: Supabase Postgres

### Key Constraint
Architecture must remain **independent of hosting providers**.
No cPanel-specific or vendor-locked dependencies.

---

## Design Principles
- Stateless backend
- Environment-variable driven configuration
- Minimal API surface
- Easy migration across hosting providers
- Security by omission (no auth surface area for MVP)