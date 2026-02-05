
# Squeegee Samurai – Commercial Storefront Quoting MVP

## North Star
Generate accurate, on-brand commercial storefront quotes in **≤ 120 seconds**, prioritizing recurring biweekly exterior service.

---

## Scope (MVP Only)
**Included**
- Ground-level commercial storefronts only
- Per-pane pricing model
- Exterior-only + Interior & Exterior options
- One-time vs recurring service
- First-time “Restore to Standard” uplift
- Monthly equivalent pricing
- PDF / print-friendly output

**Excluded**
- Residential properties
- Multi-story / ladder / lift work
- Window-type selection
- Scheduling, invoicing, payments
- CRM, employee portals, gamification

---

## Ideal Customer
Retail & restaurant storefront managers in Loudoun County  
Decision-makers: store managers, assistants, facilities managers

---

## Core Inputs
- `businessName` (string, required)
- `paneCount` (integer, required)
- `heavyBuildup` (boolean, optional)
- `applyFirstTimeUplift` (boolean, optional)
- `taxRate` (number, optional)
- `rounding` (enum: none | nearest | up, default nearest)
- `currency` (string, default USD)

---

## Pricing Constants (Per Pane)

### Exterior Only (Per Visit)
- Weekly: $4.25
- Biweekly: $4.75
- Monthly: $5.50

### Interior + Exterior
- Monthly I+O: $7.00
- Quarterly I+O: $8.00

### One-Time Clean
- $10 exterior + $5 interior = $15

### Multipliers
- Weekly: 4.33 visits/month
- Biweekly: 26 ÷ 12 ≈ 2.1667 visits/month

### First-Time Uplift
- +30% of selected tier per-visit price (applies once)

---

## Core Formulas

Let `P = paneCount`

### Per-Visit
- Weekly Exterior: `P * 4.25`
- Biweekly Exterior: `P * 4.75`
- Monthly Exterior: `P * 5.50`
- Monthly I+O: `P * 7.00`
- Quarterly I+O: `P * 8.00`
- One-Time: `P * 15`

### Monthly Equivalent
- Weekly: `weeklyVisit * 4.33`
- Biweekly: `biweeklyVisit * 2.1667`
- Monthly Exterior: `monthlyVisit`
- Monthly I+O: `monthlyIOVisit`
- Quarterly I+O: `quarterlyVisit / 3`

---

## Output Requirements
- Comparison table (Per Visit + Monthly)
- Badges:
  - Best Appearance → Weekly
  - Most Popular → Biweekly (default)
  - Lowest Cost → Monthly
- Interior + Exterior always visible as upsell
- Optional minimum charge logic
- Clean rounding

---

## UX Principles
- Minimal typing
- Default to Biweekly Exterior
- Show pricing early
- Comparison-first layout
- Brand-consistent typography and tone

---

## KPIs
- Median time-to-quote ≤ 2 minutes
- Close rate ≥ 35%
- Primary revenue mode: Biweekly Exterior
- First-time uplift usage ≤ 25%

---

## Technical Notes
- Stateless pricing engine
- Constants-driven rates
- Deterministic output
- Extendable later for residential + story-based pricing

---

## Explicitly Not MVP
- Window-type picker
- Story-level pricing
- SEO content
- CRM integration
- Employee gamification
