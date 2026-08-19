# Human Override v6

This is the real responsive website implementation matching the approved black/red cinematic Human Override mockup.

## Included
- Real HTML/CSS/JS layout (not a flat image)
- Human-centered hero artwork
- Mother/child/work section
- Mission shield and glowing red override line
- Artwork-backed issue cards
- Compact principles row
- Join form with Cloudflare D1 endpoint
- Donation controls prepared for a payment link
- Responsive mobile layout

## GitHub / Cloudflare Pages
Upload the CONTENTS of this package to the existing repository, replacing the old site files. No build command is required.

## Mailing list
1. Create a Cloudflare D1 database.
2. Run `schema.sql`.
3. Add a Pages D1 binding named `DB`.
4. Redeploy.

## Donations
Set `donationUrl` at the top of `script.js` once a payment link exists.

Deployment refresh
