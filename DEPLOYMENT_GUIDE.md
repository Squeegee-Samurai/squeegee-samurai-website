# Deployment Guide: Squeegee Samurai

Use this guide to deploy Squeegee Samurai to Vercel and connect your Resend email service.

## 1. Prerequisites (Checklist)

Ensure you have the following ready:
- [ ] **GitHub Repo**: [squeegee-samurai-website](https://github.com/Squeegee-Samurai/squeegee-samurai-website) (pushed with latest code).
- [ ] **Vercel Account**: [vercel.com](https://vercel.com)
- [ ] **Resend Account**: [resend.com](https://resend.com) (API Key + Verified Domain)

---

## 2. Resend Setup (Email)

1.  **API Key**: Create a new API Key in Resend (e.g., "Squeegee Production").
2.  **Verify Domain**: Ensure your sending domain (e.g., `squeegee-samurai.com`) is verified in Resend.
3.  **Sender Email**: Decide on the sender email (e.g., `quotes@squeegee-samurai.com`).

---

## 3. Vercel Project Setup

1.  **Import Project**:
    - Go to Vercel Dashboard -> **Add New...** -> **Project**.
    - Select "Import" next to `squeegee-samurai-website`.
2.  **Framework Preset**: Select **Vite** (it should auto-detect).
3.  **Root Directory**:
    - **IMPORTANT**: Leave this as `./` (root).
    - *Note: Vercel might suggest `frontend`, but our `vercel.json` at the root handles the routing for both the frontend SPA and the api-serverless functions.*
4.  **Environment Variables**:
    - Expand the "Environment Variables" section.
    - Add the following variables:

### Required Environment Variables

| Variable | Value Source / Example | Purpose |
| :--- | :--- | :--- |
| `VITE_API_URL` | `/` | Directs the frontend client to call serverless endpoints relatively |
| `RESEND_API_KEY` | `re_...` | Resend API Key |
| `OWNER_EMAIL` | e.g. `owner@squeegeesamurai.com` | Primary recipient of lead estimate notifications |

### Optional Environment Variables

| Variable | Value Source / Example | Purpose |
| :--- | :--- | :--- |
| `FROM_EMAIL` | e.g. `quotes@squeegee-samurai.com` | Verified domain sending address in Resend (defaults to `quotes@squeegee-samurai.com`) |
| `REPLY_TO_EMAIL` | e.g. `owner@squeegeesamurai.com` | Customer reply-to address (defaults to `OWNER_EMAIL`) |
| `ENABLE_CUSTOMER_CONFIRMATION` | `true` | Set to `true` to send a summary estimate email to the customer |

5.  **Build Settings**:
    - Build Command: `npm run build` (Default)
    - Output Directory: `dist` (Default)

6.  **Deploy**: Click **Deploy**.

---

## 4. Verification

Once deployed:
1.  **Visit URL**: Go to your Vercel deployment URL.
2.  **Test Quote (Full Flow)**:
    - Navigate to the "Free Estimate" page.
    - Submit a Residential Quote.
    - Verify you receive a success alert.
    - Check the owner's email box (`OWNER_EMAIL`) for the lead notification.
    - If `ENABLE_CUSTOMER_CONFIRMATION` is set to `true`, check the customer's email box for the estimate summary.
3.  **Test Contact Form**:
    - Go to "Contact".
    - Send a test message.
    - Verify the owner receives the contact email.
4.  **Job Application**:
    - Go to "Now Hiring".
    - Submit a test application.
    - Verify the owner receives the application details.

## Troubleshooting

- **404 on API calls?**: Ensure `Root Directory` is set to `./` (root) and not `frontend` in your Vercel settings so Vercel builds the serverless functions in `/api`.
- **Email not sending?**: Check the "Logs" tab inside your Resend Dashboard for bounces or "API Key invalid" errors.
