# MyCustomAI.co — Project Context

## What This Is
MyCustomAI.co — AI automation agency site. This is Nainoa's AI consulting business.

## Live URL
https://mycustomai.co

## Stack
- Static HTML/CSS/JS (no framework)
- Backend on Render.com
- Stripe for package purchases and subscriptions

## Pricing (updated 2026-09-03)
**3 Main Tiers (one-time):**
- Tier 1 — Guided 1:1 Setup Sprint: $7,500 — teams of 1-3 people, 5 weeks
- Tier 2 — Intensive Advisory: $14,000 — teams of 4-9 people, 8 weeks
- Tier 3 — Enterprise Multi-Office Rollout: $25,000-$35,000 (anchor: $29,500) — teams larger than 9 people, custom timeline (custom quote, no Stripe link)

**3 Monthly Retainers (recurring):**
- Momentum: $500/month (no minimum)
- Steady Progress: $900/month (3-month minimum)
- Embedded Coach: $1,000/month (3-month minimum)

**Old pricing removed:** DIY packages deleted (packages.html and license.html removed from site)

## Key Files
- `index.html` — main site
- `grader.html` — quiz with tier recommendations + Stripe checkout
- `confirmation.html` — post-purchase Cal.com booking page
- `css/` — stylesheets
- `assets/` — images and icons

## What Never Changes Without Explicit Permission
- Tier pricing structure
- Stripe payment link URLs
- Cross-promo block targeting ATL (id="mca-crosspromo" — locked May 9 2026)

## Silo Rule
This project has ZERO overlap with AITraderLogic.com. Do not import, reference, or copy logic from the ATL codebase.

## Git
- Branch before any change: `git checkout -b task/[description]`
- No `git push` — local commits only
