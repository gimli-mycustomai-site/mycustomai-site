# My Custom AI — Website

AI consulting site for Hawaii small businesses.

**Live site:** https://mycustomai.co  
**GitHub Pages:** https://[your-username].github.io/mycustomai-site/

## Pages
- `index.html` — Homepage
- `checkout.html` — Plan selection + payment
- `intake.html` — Business intake form
- `confirmation.html` — Post-purchase confirmation

## Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `mycustomai-site`)
2. Push this folder to the `main` branch
3. Go to repo **Settings → Pages**
4. Set source to **Deploy from branch → main → / (root)**
5. GitHub will publish at `https://[username].github.io/mycustomai-site/`

## Point Custom Domain (mycustomai.co)

In your domain registrar (Namecheap/GoDaddy/etc):

Add these DNS records:
```
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
CNAME www   [your-username].github.io
```

Then in GitHub Pages settings, set custom domain to `mycustomai.co` and enable **Enforce HTTPS**.

## Payment (Stripe)

When ready to take payments:
1. Create a Stripe account
2. Create two Payment Links: one for $75 (Starter), one for $700 (Pro)
3. In `checkout.html`, uncomment the `links` object in `handleCheckout()` and paste your links
4. Set the Stripe success URL to: `https://mycustomai.co/intake.html?plan=starter` (or `?plan=pro`)

## PDF Backend (TODO)

When intake form is submitted, needs to:
1. Capture form data
2. Generate custom PDF report (via OpenAI + template)
3. Email PDF to customer

Options: Supabase Edge Functions + Resend, or a simple Node.js backend on Render/Railway.
