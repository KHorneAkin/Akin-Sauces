# Akin' Sauces & Seasonings — Website Architecture (Source of Truth)

Status: DRAFT — pending client asset delivery + second-agent audit
Last updated: 2026-07-20

## 1. Client & Project Summary

- **Business name:** Akin' Sauces & Seasonings (spelled **AKIN**, pronounced "Achin'")
- **Owner:** Carl Horne
- **Business:** Hot sauces and seasonings, ~30 flavors
- **Deliverables:** 1) Marketing/e-commerce-ready website, 2) QR code for truck/car decal, business cards, and flyers, linking to the site
- **Developer engagement:** Flat $200 for developer's build hours. Hosting/domain/email are separate recurring costs billed to the client, itemized so there's no confusion between "pay Carl once" and "pay the infrastructure providers monthly/annually."
- **Timeline:** No hard deadline / event tie-in given. Client wants it done quickly. Treat as flexible-but-fast.
- **Primary goal:** Promote the business and showcase the brand. Not currently scoped as a full storefront (see §5 Ordering).

## 2. Brand

- **Logo:** Client has one and it's strong — reuse as-is. Not yet in hand; must be requested/collected before build.
- **Colors:** Black-dominant palette with gold-ish accent/trim.
- **Photography:** Client's existing product photos are AI-generated — **do not use them.** Developer is hand-drawing replacement art. Real photography of actual product is a future to-do (flag to client).
- **Voice/content:** Business card copy example: "Check out our flavors" + flavor list + "text or email to learn more." Tone is casual/fun (flavor names lean playful/edgy — see §4).

## 3. Site Map (v1)

No auth, no accounts, no user sign-in/sign-up — pure marketing + catalog site.

1. **Home**
   - Hero (logo, brand statement)
   - Sauce preview section (spotlight a few flavors / "new flavors")
   - About the business (roots/story)
   - About the owner (Carl Horne)
   - CTA into the full catalog
2. **Sauces / Catalog**
   - Full flavor catalog (target ~30 flavors; 7 known so far, see §4)
   - Each flavor: name, (future) description/heat level, (future) image
   - "Order" action — see §5 for v1 vs v2 behavior
3. **Contact**
   - Simple form → routes to business email (see §6)
   - Phone/email/social also displayed directly (matches business card habit of listing contact info)

That's the full v1 scope. No blog, no gallery, no booking — matches client's "keep it simple" framing.

## 4. Known Product Data

Flavors named so far (of ~30 total — full list still needed from client):

- Mango Habanero
- Birdie Birdie
- Creole Garlic
- Scorp (likely short for Scorpion)
- Old Whiskey Dick
- Ginger Dragon
- Fallen Angel

Model these as simple content records now (name + slug), with description/heat-level/price/image fields left nullable until client supplies them. Don't block v1 build on having all 30 — ship with what exists, add the rest as a content update.

## 5. Ordering / Checkout

- **v1 (ship now):** Browse-only catalog. Each flavor's "Order" button opens a pre-filled email or SMS to the business contact — mirrors what the client's business card already does. No cart, no payment processing, no inventory/shipping logic.
- **v2 (build now, keep behind a feature flag — OFF by default):** Real cart + Stripe Checkout. Build the integration now so flipping it on later doesn't require new architecture, but it stays inert until:
  - Client has (or agrees to create) a Stripe account
  - Client decides how fulfillment/shipping works (flat rate? by weight? local pickup option?)
  - Client provides Stripe API keys
- Reasoning: client's own instinct was "people should be able to order from this," but building full checkout in v1 would blow past the $200/quick-turnaround target and adds real liability (payment handling, shipping promises) before the client is ready to operationalize fulfillment. Feature-flagging avoids re-architecting later.

## 6. Domain, Email, Hosting

- **Domain:** Client owns none yet. Developer to register on client's behalf, recommend `akinsaucesandseasonings.com` (confirm availability) or a shorter variant if the full name isn't available/practical. Client deferred to developer's judgment.
- **Business email:** None yet. Client currently uses a personal Gmail (`kh854600@gmail.com`) for the business — plan is to migrate to a proper `@<domain>` address once the domain is live. Cheapest professional options to evaluate: Zoho Mail free tier, or Google Workspace (~$6/mo) if the client wants Gmail's interface specifically. Recommend whichever is cheapest that still looks professional, given client is budget-sensitive.
- **Hosting/deploy:** Developer preference is **Railway**. Given the simple v1 scope (marketing + catalog, no auth, no real-time features), a static or lightly-server-rendered site is sufficient — a full Supabase+FastAPI stack (like the AniSol project) would be overkill here. Recommend:
  - Frontend: static/SSG (e.g., Next.js static export or Astro) — cheapest to host, fastest to build
  - Backend: only if needed for the contact form + (later) Stripe webhook handling — a small lightweight API service on Railway, or serverless functions if the frontend framework supports them natively (avoids running a second always-on service just for a contact form)
  - Database: not needed for v1 (flavor catalog can be static content/JSON or a lightweight CMS). Only introduce Supabase/Postgres if/when the flavor catalog needs to be editable by the client without a code deploy, or once Stripe/orders go live.
- **Ongoing costs to itemize for the client separately from the $200 build fee:** domain renewal (annual), hosting (Railway usage — likely near-$0 at this scale), optional email hosting, optional future maintenance retainer.

## 7. QR Code

- **Placement:** Truck/car decal, business cards, flyers.
- **Target:** Site homepage.
- **Format:** Needs both a high-res print file (decal/flyer) and a digital version. Should carry brand colors (black/gold) and ideally incorporate the logo once received.

## 8. Open Items / Blocked On Client

- [ ] Logo file
- [ ] Full flavor list (~23 more flavors) + descriptions/heat levels/prices
- [ ] Real product photography (replacing AI art) — developer is hand-drawing interim art
- [ ] Domain name final pick + registration go-ahead
- [ ] Decision: Zoho free vs Google Workspace for business email
- [ ] Stripe account + fulfillment/shipping model (only needed to flip on v2 ordering)
- [ ] Any brand fonts (none confirmed yet — treat as undecided, pick a clean pairing that fits black/gold if client has no preference)

## 9. Explicit Non-Goals (v1)

- No user accounts / auth
- No live checkout (built but flagged off — see §5)
- No blog/gallery/booking
- No multi-language support
