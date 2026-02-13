# Vercel Migration & Verification Checklist: Squeegee Samurai

Use this guide to ensure your migration to the new Vercel account is 100% correct.

## 1. Environment Variables (Critical)

Go to **Vercel Project Settings** → **Environment Variables** and ensure these EXACT variables are present.

| Variable | Value Notes | Required For |
| :--- | :--- | :--- |
| `VITE_API_URL` | Set to `/` (or leave empty if using rewrites) | Frontend API calls |
| `DATABASE_URL` | From Supabase Project Settings → Database → Connection String (Use "Transaction" mode port 6543) | Quote Persistence |
| `SUPABASE_URL` | From Supabase Project Settings → API | DB Connection |
| `SUPABASE_SERVICE_ROLE_KEY` | From Supabase Project Settings → API (Secret!) | Storage Uploads |
| `SUPABASE_STORAGE_BUCKET` | `quotes` | PDF Storage |
| `RESEND_API_KEY` | From Resend Dashboard | Email Delivery |
| `RESEND_FROM_EMAIL` | e.g. `quotes@squeegee-samurai.com` | Email Sender |
| `NOTIFY_EMAIL` | The owner's email address | Lead Notifications |
| `PDF_URL_EXPIRY_SECONDS` | Optional (default: `259200` = 72h) | How long quote links last |

> ⚠️ **Action:** After adding these, you **MUST** go to **Deployments** and click **Redeploy** on the latest commit for them to take effect.

---

## 2. Framework & Build Settings

Go to **Vercel Project Settings** → **General**.

| Setting | Expected Value |
| :--- | :--- |
| **Framework Preset** | **Vite** (NOT Next.js - this is a React SPA) |
| **Root Directory** | `./` (The project root, NOT `frontend`) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Node.js Version** | **20.x** (Standard for new projects) |

> **Why Root?** Our `vercel.json` at the root handles routing for both the `frontend` SPA and the `api-serverless` functions. If you set Root Directory to `frontend`, the API will break.

---

## 3. Domain & DNS

Go to **Vercel Project Settings** → **Domains**.

1.  Add your custom domain (e.g., `squeegeesamurai.com`).
2.  Update DNS records at your registrar (GoDaddy/Namecheap) as shown by Vercel (usually an A record or CNAME).

---

## 4. Webhooks & Integrations

### Supabase Auth (Future Proofing)
Even though Auth is "out of scope" for MVP, if you have enabled it in Supabase, update the **Site URL**:
- Go to **Supabase Dashboard** → **Auth** → **URL Configuration**.
- Set **Site URL** to your new production domain (e.g., `https://squeegeesamurai.com`).
- Add `https://squeegeesamurai.com/**` to **Redirect URLs**.

### Email (Resend)
- Ensure the domain you verify in Resend matches the one you are sending from (`RESEND_FROM_EMAIL`).

---

## 5. Sanity Check / Verification Steps

After redeploying, visit your live site and perform these specific tests:

1.  **Homepage Load**: Does the landing page load without errors?
2.  **Quote Submission (Full Flow)**:
    - Go to "Free Estimate".
    - Submit a Residential Quote.
    - **Check 1**: Did you see a success message?
    - **Check 2**: Did you receive the customer email?
    - **Check 3**: Did the link in the email open a PDF?
    - **Check 4**: Did the owner (`NOTIFY_EMAIL`) get a notification?
3.  **Contact Form**:
    - Go to "Contact".
    - Send a test message.
    - Verify owner received the email.
4.  **Job Application**:
    - Go to "Now Hiring".
    - Submit a test application.
    - Verify owner received the email.

---

## 6. Common Pitfalls specific to this Project

- **"404 Not Found" on API calls**: Verification that `Root Directory` is `./` and `vercel.json` exists.
- **PDF Upload Error**: Verification that `SUPABASE_SERVICE_ROLE_KEY` is correct (starts with `ey...`) and NOT the `anon` key.
- **Email not sending**: Check Resend "Logs" tab for bounces or "API Key invalid" errors.
