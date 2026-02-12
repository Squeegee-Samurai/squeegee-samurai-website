# Deployment Guide: Squeegee Samurai

Use this guide to connect your new Vercel account, GitHub repo, and external services (Supabase, Resend).

## 1. Prerequisites (Checklist)

Ensure you have the following ready:
- [ ] **GitHub Repo**: [squeegee-samurai-website](https://github.com/Squeegee-Samurai/squeegee-samurai-website) (pushed with latest code).
- [ ] **Vercel Account**: [vercel.com](https://vercel.com)
- [ ] **Supabase Project**: [supabase.com](https://supabase.com) (Database + Storage)
- [ ] **Resend Account**: [resend.com](https://resend.com) (API Key + Verified Domain)

---

## 2. Supabase Setup (Database & Storage)

1.  **Create Project**: Create a new project in Supabase.
2.  **Database Schema**:
    - Go to **SQL Editor**.
    - Copy the content of [`api/schema.sql`](https://github.com/Squeegee-Samurai/squeegee-samurai-website/blob/main/api/schema.sql).
    - Run the SQL to create the `quotes` table.
3.  **Storage Bucket**:
    - Go to **Storage**.
    - Create a new bucket named `quotes`.
    - **IMPORTANT**: Set "Public" to **OFF** (Private).
4.  **Get Credentials**:
    - Go to **Project Settings** -> **API**.
    - Copy:
        - `Project URL`
        - `service_role` secret (used for backend server uploads).

---

## 3. Resend Setup (Email)

1.  **API Key**: Create a new API Key in Resend (e.g., "Squeegee Production").
2.  **Verify Domain**: Ensure your sending domain (e.g., `squeegee-samurai.com`) is verified in Resend.
3.  **Note Sender Email**: Decide on the sender email (e.g., `quotes@squeegee-samurai.com`).

---

## 4. Vercel Project Setup

1.  **Import Project**:
    - Go to Vercel Dashboard -> **Add New...** -> **Project**.
    - Select "Import" next to `squeegee-samurai-website`.
2.  **Framework Preset**: Select **Vite** (it should auto-detect).
3.  **Root Directory**:
    - **IMPORTANT**: Leave this as `./` (root).
    - *Note: Vercel might suggest `frontend`, but our `vercel.json` handles the routing for both frontend and api-serverless from the root.*
4.  **Environment Variables**:
    - Expand "Environment Variables" section.
    - Add the following (copy from your local `.env` or see list below).

### Required Environment Variables

| Variable | Value Source |
| :--- | :--- |
| `VITE_API_URL` | `/` (This forces frontend to use relative path to hit Vercel functions) |
| `SUPABASE_URL` | Supabase Project Settings -> API -> Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Project Settings -> API -> `service_role` secret |
| `SUPABASE_STORAGE_BUCKET` | `quotes` |
| `RESEND_API_KEY` | Resend Dashboard -> API Keys |
| `RESEND_FROM_EMAIL` | e.g. `quotes@squeegee-samurai.com` |
| `NOTIFY_EMAIL` | Owner email (where you want to receive leads) |

5.  **Build Settings**:
    - Build Command: `npm run build` (Default)
    - Output Directory: `dist` (Default)

6.  **Deploy**: Click **Deploy**.

---

## 5. Verification

Once deployed:
1.  **Visit URL**: Go to your Vercel deployment URL.
2.  **Test Quote**: Submit a "Free Estimate" request.
    - Verify you receive an email.
    - Verify PDF link in email works.
    - Verify data appears in Supabase `quotes` table.
3.  **Test Contact**: Submit a contact form.
    - Verify owner receives notification email.

## Troubleshooting

- **404 on API calls?**: Ensure `VITE_API_URL` is set to `/` (or empty) so the frontend calls `/api-serverless/...` relative to the domain.
- **PDF Upload Failed?**: Check `SUPABASE_SERVICE_ROLE_KEY` (must be `service_role`, not `anon`).
- **Email Failed?**: Check Resend logs in Resend Dashboard.
