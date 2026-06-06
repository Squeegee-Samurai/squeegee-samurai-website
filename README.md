# Squeegee Samurai

Business website and automated quote system for a window cleaning service.

## Quick Start

### Local Development (Frontend + API Functions)
To run the application locally, you can use the Vercel CLI which runs both the Vite frontend and Vercel Serverless Functions:

1. Install dependencies in the root:
   ```bash
   npm install
   ```
2. Set up your local environment variables in a `.env` file (see the deployment guide for details).
3. Run the development environment:
   ```bash
   npx vercel dev
   ```
   This will boot the app on `http://localhost:3000` (or similar).

Alternatively, to run only the frontend client:
```bash
npm run dev
```

## Project Structure

```
squeegee-samurai/
├── frontend/           # React SPA (Vite + Tailwind CSS)
├── api/                # Vercel serverless functions (submit-estimate, career, contact)
├── lib/                # Shared email formatting and utility functions
├── docs/               # Architecture spec and workflow rules
├── scripts/            # Build utilities (sitemap generation)
└── vercel.json         # Vercel deployment routing config
```

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Vercel Serverless Functions
- **Email**: Resend API
- **Hosting**: Vercel

## Documentation

See [`docs/`](./docs/) for the specifications:
- [Development Workflow](./docs/dev_workflow.md) — Architectual guidelines and developer workflow constraints.
- [API Spec](./docs/API_SPEC.md) — Canonical API contract for the estimate submission flow.
# squeegee-samurai-website
