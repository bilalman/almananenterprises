# AL-MANNAN ENTERPRISES — GoDaddy cPanel Deployment Guide

This guide provides step-by-step instructions to deploy the static build of the **AL-MANNAN ENTERPRISES** website to standard GoDaddy Linux / cPanel shared hosting (`public_html`).

---

## 1. Prerequisites
- A standard GoDaddy Linux Web Hosting account with cPanel.
- A registered domain (e.g., `almannanenterprises.com`) pointed to your hosting.
- PHP 7.4, 8.0, 8.1, or 8.2 enabled on cPanel (Standard on GoDaddy).
- A domain-based email account created in cPanel (e.g., `info@almannanenterprises.com` and `recruitment@almannanenterprises.com`).

---

## 2. Generating the Static Production Build

On your local development machine:

```bash
# Install dependencies
npm install

# Generate optimized static production files
npm run build
```

This creates a `dist/` directory containing:
- `index.html` (Main entry point)
- `assets/` (Compiled JavaScript and CSS bundles)
- `.htaccess` (Apache routing rules for SPA direct URL visits & asset caching)
- `robots.txt` & `sitemap.xml` (SEO search engine files)
- `api/contact.php` (Serverless cPanel PHP contact & manpower inquiry email handler)
- `api/apply.php` (Serverless cPanel PHP candidate registration & CV attachment handler)

---

## 3. Uploading to GoDaddy cPanel

1. **Log into your GoDaddy account** and click **Web Hosting** > **Manage**.
2. Click **cPanel Admin**.
3. In cPanel, click **File Manager** under the *Files* section.
4. In the top-right corner of File Manager, click **Settings**, check **Show Hidden Files (dotfiles)**, and click **Save**. *(Crucial for `.htaccess`)*.
5. In the left panel, navigate into the **`public_html`** directory (or your addon domain directory).
6. If there is a default `default.html` or placeholder index from GoDaddy, remove or rename it.
7. Zip the contents of your local `dist/` folder (or upload them directly):
   - In File Manager, click **Upload**.
   - Select your zip file, upload it, then right-click and choose **Extract**.
   - Ensure `index.html` is located directly inside `/public_html/index.html`.
8. Confirm that `.htaccess` is present inside `public_html`.

---

## 4. Configuring PHP Email Handlers (`/api/contact.php` & `/api/apply.php`)

Open File Manager, navigate to `public_html/api/`, right-click `contact.php` and click **Edit**:
1. Line 30: Set `$RECIPIENT_EMAIL` to your official business inbox (e.g., `info@almannanenterprises.com`).
2. Line 33: Set `$SENDER_EMAIL` to a mailbox on your domain (e.g., `no-reply@almannanenterprises.com`).
3. Save changes.

Repeat for `public_html/api/apply.php`:
1. Line 26: Set `$RECIPIENT_EMAIL` to your recruitment desk inbox (e.g., `recruitment@almannanenterprises.com`).
2. Save changes.

---

## 5. Identifying & Replacing Placeholders

All placeholders in the website have been clearly designated with brackets `[...]`. Search and update:

| Placeholder | Location in Code | Purpose |
| :--- | :--- | :--- |
| `[Plot / Office Suite, Commercial Plaza...]` | `src/data/companyData.ts` & Contact page | Physical office address in Pakistan |
| `[+92-XX-XXXXXXX]` / `[+92-3XX-XXXXXXX]` | `src/data/companyData.ts` & Contact page | Landline and mobile contact numbers |
| `info@almannanenterprises.com` | `src/data/companyData.ts` & PHP files | General inquiry email address |
| `recruitment@almannanenterprises.com` | `src/data/companyData.ts` & PHP files | Overseas recruitment CV inbox |
| `[Government of Pakistan OEP License No: OEP/XXXX/XXXX]` | Header, Footer, & About page | Official Bureau of Emigration license |
| Google Maps Embed URL | `ContactPage.tsx` | Embed link for your actual Google Business listing |

*(After updating `src/data/companyData.ts`, simply run `npm run build` and re-upload the built assets.)*

---

## 6. Verification Checklist
- Visit `https://yourdomain.com/` — Homepage loads smoothly.
- Test SPA routing: Navigate to `/about`, `/services/overseas-employment`, and refresh the browser page. It should NOT return a 404 because `.htaccess` redirects properly to `index.html`.
- Submit the **Request Manpower / Contact** form. Confirm the success message displays and the email is received in your inbox.
- Submit a test **Candidate Registration** with an attached PDF CV on `/apply`. Confirm the email is received with the attachment intact.
