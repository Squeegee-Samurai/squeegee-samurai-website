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
- **Planned**: Remove EmailJS; submit quote form to backend API only.

---

## Backend API
| Layer    | Choice        | Notes                                  |
|----------|---------------|----------------------------------------|
| Runtime  | Node.js 18+   |                                        |
| Language | TypeScript    |                                        |
| Server   | Express       | Local dev; can deploy as Vercel serverless |
| DB client| `pg`          | Postgres only                          |

- API surface: `POST /api/quote`, `GET /api/health`.
- No auth, sessions, or user/role models for MVP.

---

## Data
| Layer    | Choice     | Notes                          |
|----------|------------|--------------------------------|
| Database | PostgreSQL | Preferred host: Supabase       |
| Schema   | Single table `quotes` | See [schema.md](./schema.md) |

- Access only from API; no direct client access.

---

## Email
- Server-side only. Env-driven (SMTP or transactional provider).
- Triggered on successful quote submission; owner notification.

---

## Hosting (target)
| Component | Target              | Alternative        |
|-----------|---------------------|--------------------|
| Frontend  | Vercel (static)     | —                  |
| API       | Vercel API Routes  | Supabase Edge Fns  |
| Database  | Supabase Postgres  | Any Postgres      |

- Config via env vars; no provider lock-in in code.

---

## Legacy / out of scope
- **Java/Spring Boot** (`backend/`): Superseded by Node API in `api/`. Can be removed or kept for reference.
- **EmailJS**: To be removed from frontend; backend will send notifications.
- **User login/signup**: Not in MVP.
