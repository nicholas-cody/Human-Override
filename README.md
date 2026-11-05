# Human Override — Website Refresh (November 2026)

A **real, editable HTML/CSS/JS website** for GitHub + Cloudflare Pages, rebuilt using the previous approved Human Override website. Nothing in this package is a static mockup or an image of the website.

## What changed

- Clearer, higher-contrast homepage typography and a wider, responsive layout.
- The previously approved **fingerprint + Earth** artwork is used as the actual hero image; the heading, navigation and CTAs are real HTML.
- Preserved the existing "Why This Matters" photo on the left and all five points on the right.
- Preserved the mission, all six principles (one row on desktop), and four issue cards (one row on desktop).
- Updated previously approved section headings: **Principles — “Some decisions are too important to surrender.”** and **Where We Draw the Line — “Lines worth drawing.”**
- Cleaned up three issue-card graphics that contained baked-in old labels.
- Improved mobile layout, navigation accessibility, focus states, and form feedback.
- Updated "Donate Now" language to **"Support the Project"** and added the non-tax-deductibility notice.

## Deploy to Cloudflare Pages via GitHub

1. **Keep a backup** of the currently live repository or use a new branch/Cloudflare preview project to compare the design first.
2. Unzip this archive. Its `index.html`, `styles.css`, `script.js`, `assets/`, `functions/`, and `schema.sql` are the site files. **Put the contents at the root of the Pages GitHub repository**, not inside a nested ZIP folder.
3. Commit the changed site files. Cloudflare Pages will deploy the branch selected in its Git integration.
4. Check the preview deployment at desktop and mobile widths before promoting it to the production site.
5. **Do not delete or replace Cloudflare environment settings or D1 database bindings.** Those are not contained in this archive.

## Join form — existing Cloudflare Pages Function

The form submits a `POST` request to `/api/subscribe` and relies on a Cloudflare D1 binding named `DB`, with a `subscribers` table defined in `schema.sql`.

- If your D1 binding and table already work on your existing Pages project, the website continues using that integration.
- If not, create/configure D1 in Cloudflare, initialize it with `schema.sql`, and set the Pages Functions D1 binding to `DB`. Do this for the appropriate preview and production environments as needed.
- Test one actual submission after deployment. The offline HTML preview cannot save signups.
- The site now asks explicitly for consent to receive updates; it does **not** claim a working unsubscribe service yet. Add an unsubscribe mechanism and email-delivery service before broadcasting to a mailing list. Consider Cloudflare Turnstile for abuse resistance.

## Support contributions — checkout intentionally NOT connected

The amounts are selectable, but the checkout link stays visibly unavailable because no real payment URL has been supplied. **No payment link has been invented.**

To activate, open `script.js` and set URLs in `CONFIG.contributionLinks` (10, 25, 50, 100, other) and/or `CONFIG.contributionFallbackUrl`. Use an **actual Stripe or PayPal hosted payment URL**, not secret API credentials. A fallback link works for every amount; amount-specific links take precedence.

`other` should point to a hosted checkout that explicitly permits customer-chosen amounts if you want that option. Verify all links before deploying. The website itself does not collect card details.

**Legal/organization note:** This project is not represented as a 501(c)(3). The support section states contributions are not tax-deductible. Confirm required fundraising disclosures and payment/account setup before accepting support.

## Files

- `index.html` — real HTML content and semantic structure
- `styles.css` — new responsive style system
- `script.js` — menu, progress bar, join form, contribution link configuration
- `functions/api/subscribe.js` — original subscription function; corrected an escaped regular-expression typo in email validation
- `schema.sql` — existing D1 table schema
- `assets/` — the existing approved imagery and cleaned copies of issue art

No secret keys are included in this archive. This package **does not make changes to the live domain by itself**.
