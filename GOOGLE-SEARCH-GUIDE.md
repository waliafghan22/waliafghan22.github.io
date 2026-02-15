# How to Get Your Website (waliafghan22.github.io) to Appear in Google Search

Your site already has good SEO basics: **meta tags**, **sitemap**, **robots.txt**, and a **Google verification file**. To actually show up in Google, you need to use Google Search Console and give Google a clear path to your pages. Follow these steps in order.

---

## Step 1: Verify Your Site in Google Search Console

1. Go to **[Google Search Console](https://search.google.com/search-console)** and sign in with your Google account.
2. Click **“Add property”** (or **“Add site”**).
3. Choose **“URL prefix”** and enter:
   ```text
   https://waliafghan22.github.io
   ```
4. Click **“Continue”**.
5. For **verification method**:
   - You already have the **HTML file** `google709d2a2e0a98756b.html` in your repo, so choose **“HTML file upload”**.
   - Google will show a filename; it should match your file. Confirm the file is live at:
     ```text
     https://waliafghan22.github.io/google709d2a2e0a98756b.html
     ```
   - If your file has a different name, use the one Google shows and add that file to your repo root, then deploy.
6. Click **“Verify”**.  
   If it fails, wait a few minutes after your last GitHub Pages deploy and try again.

---

## Step 2: Submit Your Sitemap

1. In Search Console, open your property **“https://waliafghan22.github.io”**.
2. In the left menu, go to **“Sitemaps”** (under “Indexing”).
3. In **“Add a new sitemap”** enter:
   ```text
   sitemap.xml
   ```
   (Your full sitemap URL is: `https://waliafghan22.github.io/sitemap.xml`)
4. Click **“Submit”**.
5. Status will show “Success” or “Couldn’t fetch” (if there’s a problem). Fix any errors it reports.

This tells Google where all your important pages are.

---

## Step 3: Request Indexing for Your Homepage (and Key Pages)

1. In Search Console, use the top **URL inspection** bar.
2. Enter:
   ```text
   https://waliafghan22.github.io
   ```
3. Press Enter. Wait until it says “URL is on Google” or “URL is not on Google”.
4. If it says **“URL is not on Google”**, click **“Request indexing”**.
5. Repeat for a few important URLs if you want (e.g. `/about/`, one or two project pages).

Do not overuse “Request indexing”; a few main URLs are enough.

---

## Step 4: Confirm robots.txt and Sitemap Are Correct

Your `robots.txt` already has:

- `User-agent: *` and `Allow: /`
- `Sitemap: https://waliafghan22.github.io/sitemap.xml`

Check they work live:

1. Open: **https://waliafghan22.github.io/robots.txt**
2. Open: **https://waliafghan22.github.io/sitemap.xml**

If both load and look correct, you’re good.

---

## Step 5: Give Google Time to Crawl

- **New or rarely updated sites** can take from a few days to a few weeks to appear.
- After submitting the sitemap and requesting indexing, check back in **Search Console → “Pages” / “Sitemaps”** and **“Performance”** after a few days.
- You can also test in a private window:  
  `site:waliafghan22.github.io`  
  in Google. If nothing appears yet, wait and keep the sitemap submitted.

---

## Step 6: Optional – Improve Discoverability

- **Share the site** (e.g. LinkedIn, Twitter, portfolio links). Inbound links and visits can help.
- **Keep the sitemap updated** (your Jekyll setup already regenerates it).
- **Add a bit of text** on the homepage and project pages (you already have titles and descriptions; more unique text can help).
- **Use clear headings** (e.g. one `<h1>` per page) and good `title` / `meta description` (you already have these).

---

## Checklist Summary

| Step | Action |
|------|--------|
| 1 | Verify **https://waliafghan22.github.io** in Google Search Console (HTML file or meta tag). |
| 2 | Submit **sitemap.xml** in the “Sitemaps” section. |
| 3 | Use **URL inspection** and **Request indexing** for the homepage (and 1–2 key URLs). |
| 4 | Confirm **robots.txt** and **sitemap.xml** are reachable in the browser. |
| 5 | Wait a few days to a few weeks and check **Performance** and `site:waliafghan22.github.io` in Google. |

---

## If It Still Doesn’t Show Up

- In Search Console, check **“Coverage”** or **“Pages”** for errors (e.g. “Crawled – currently not indexed” or “Blocked”).
- Fix any **security or redirect issues** (e.g. mixed content, broken HTTPS).
- Make sure GitHub Pages is set to the correct branch (e.g. `main`) and the repo is public.
- Ensure there is no `noindex` in your pages (your current setup does not add one).

Once verification and sitemap submission are done and indexing is requested, the main remaining factor is **time** for Google to crawl and index your site.
