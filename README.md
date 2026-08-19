# Human Override — Cloudflare Pages Starter

This is a first working version of the Human Override advocacy website.

## Included

- Responsive single-page advocacy website
- Human-first AI and automation messaging
- Mailing-list signup form
- Cloudflare Pages Function endpoint
- Cloudflare D1 schema for storing subscriber emails
- Donation button prepared for a Stripe Payment Link
- No framework or build process required

## Fastest way to publish the visual site

Upload this folder to a GitHub repository and connect that repository to Cloudflare Pages.

There is no build command. The output/root directory is the project root.

The site itself will work immediately. The mailing-list form will show a setup message until D1 is connected.

## Activate the mailing list with Cloudflare D1

1. In Cloudflare, create a D1 database. A name like `human-override-mailing-list` is fine.
2. Open the D1 console and run the SQL in `schema.sql`.
3. Open your Pages project settings and add a D1 binding.
4. Set the binding name exactly to:

   `DB`

5. Select the D1 database you created.
6. Redeploy the Pages project.

The form at `/api/subscribe` will then store unique email addresses in the `subscribers` table.

## Donations

The donation button is intentionally disabled until you choose a payment provider.

The simplest initial route is a Stripe Payment Link.

After creating the payment link, open `script.js` and replace:

    donationUrl: ""

with:

    donationUrl: "YOUR_STRIPE_PAYMENT_LINK"

The button will then open the secure Stripe checkout.

## Important organization note

Until the group has the appropriate nonprofit/tax-exempt legal status, do not tell visitors that donations are tax-deductible.

You can still organize an advocacy group and accept ordinary contributions, but legal/tax treatment depends on how the organization is formed and what activities it conducts.

## Good next revisions

- Founder / About page
- Full manifesto
- News / updates page
- Research and sources page
- Volunteer signup
- Campaign / petition pages
- Social-sharing preview image
- Custom domain
- Privacy policy
- Terms / donation disclosure
- Mailing-list unsubscribe workflow
- Admin export for subscriber list

The visual identity and wording are deliberately positioned as human-first rather than anti-technology. That gives the movement room to advocate for limits, legislation, accountability, worker protections, disclosure, privacy and human review without sounding like it rejects every useful technology.
