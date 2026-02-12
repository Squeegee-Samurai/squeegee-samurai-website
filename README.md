# Squeegee Samurai

Business website and automated quote system for a window cleaning service.

## Quick Start

### Frontend (React SPA)
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:5173

### API (Express — local dev)
```bash
cd api
npm install
cp .env.example .env   # configure all variables
npm run dev
```
API at http://localhost:3000

## Project Structure

```
squeegee-samurai/
├── frontend/           # React + Vite + Tailwind
├── api/                # Express API (local dev)
│   └── src/
│       ├── pdf/        # PDF template + assets
│       ├── services/   # PDF generation, email
│       └── ...
├── api-serverless/     # Vercel serverless functions (production)
├── docs/               # Architecture, schema, workflow docs
├── scripts/            # Utilities (sitemap generation)
└── vercel.json         # Vercel deployment config
```

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **API**: Node.js, TypeScript, Express / Vercel Serverless
- **Database**: PostgreSQL (Supabase)
- **PDF**: @react-pdf/renderer
- **Email**: Resend
- **Storage**: Supabase Storage
- **Hosting**: Vercel

## Documentation

See [`docs/`](./docs/) for full documentation:
- [Architecture](./docs/architecture.md)
- [Tech Stack](./docs/tech-stack.md)
- [API Contract](./docs/api-contract.md)
- [Database Schema](./docs/schema.md)
- [Development Workflow](./docs/dev_workflow.md)
- [PDF Implementation](./docs/pdf-implimentation/pdf-implementation-complete.md)
# squeegee-samurai-website
