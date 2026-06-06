# Vercel Migration & Verification Checklist: Squeegee Samurai

Use this guide to ensure your migration to the Vercel hosting setup is 100% correct.

## 1. Environment Variables (Critical)

Go to **Vercel Project Settings** → **Environment Variables** and ensure these EXACT variables are present.

| Variable | Value Notes | Required For |
| :--- | :--- | :--- |
| `VITE_API_URL` | Set to `/` (Forces frontend to make relative API requests) | Frontend API calls |
| `RESEND_API_KEY` | From Resend Dashboard | Email Delivery |
| `OWNER_EMAIL` | The owner's email address (leads destination) | Lead Notifications |
| `FROM_EMAIL` | e.g. `quotes@squeegee-samurai.com` (optional) | Email Sender Address |
| `REPLY_TO_EMAIL` | e.g. `owner@squeegeesamurai.com` (optional) | Reply-To for Customers |
| `ENABLE_CUSTOMER_CONFIRMATION` | `true` (optional) | Sending customer estimates |

> ⚠️ **Action:** After modifying these variables, you **MUST** go to **Deployments** on Vercel and click **Redeploy** on the latest commit for changes to take effect.

---

## 2. Framework & Build Settings

Go to **Vercel Project Settings** → **General**.

| Setting | Expected Value |
| :--- | :--- |
| **Framework Preset** | **Vite** (NOT Next.js - this is a React SPA) |
| **Root Directory** | `./` (The project root, NOT `frontend`) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Node.js Version** | **20.x** or higher |

> **Why Root?** Our `vercel.json` at the root handles routing for both the `frontend` SPA and the `api` functions. If you set Root Directory to `frontend`, the API endpoints will break.

---

## 3. Domain & DNS

Go to **Vercel Project Settings** → **Domains**.

1.  Add your custom domain (e.g., `squeegeesamurai.com`).
2.  Update DNS records at your registrar (GoDaddy/Namecheap) as shown by Vercel (usually an A record or CNAME).

---

## 4. Email Setup (Resend)

- Ensure the domain you verify in Resend matches the one you are sending from (`FROM_EMAIL` / `quotes@squeegee-samurai.com`).

---

## 5. Sanity Check / Verification Steps

After redeploying, visit your live site and perform these specific tests:

1.  **Homepage Load**: Does the landing page load without errors?
2.  **Quote Submission (Full Flow)**:
    - Go to "Free Estimate".
    - Submit a Residential Quote.
    - **Check 1**: Did you see a success message?
    - **Check 2**: Did the owner (`OWNER_EMAIL`) get the lead email?
    - **Check 3**: Did the customer receive the estimate confirmation email (if `ENABLE_CUSTOMER_CONFIRMATION` is `true`)?
3.  **Contact Form**:
    - Go to "Contact".
    - Send a test message.
    - Verify the owner received the email.
4.  **Job Application**:
    - Go to "Now Hiring".
    - Submit a test application.
    - Verify the owner received the email.

---

## 6. Common Pitfalls

- **"404 Not Found" on API calls**: Verification that `Root Directory` is `./` and `vercel.json` exists in root.
- **Email not sending**: Check the Resend "Logs" tab for bounces or "API Key invalid" errors.
