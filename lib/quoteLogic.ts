/**
 * Server-side quote computation (authoritative).
 * Mirrors frontend logic so API can validate and recompute.
 */

export interface QuoteBody {
  contact: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    city?: string;
    zipCode?: string;
  };
  formInput: {
    propertyType?: 'Residential' | 'Commercial'; 
    serviceType?: string;
    windowCount?: number;
    screenCount?: number;
    stories?: string;
    frequency?: string;
    additionalServices?: string[];
    specialRequests?: string;
    businessName?: string;
    // Legacy fields possibly sent but ignored
    bestTimeToCall?: string;
    preferredContact?: string;
    couponCode?: string;
    imageUrls?: string[];
  };
}

export interface QuoteResult {
  totalCents: number;
  breakdown: { subtotal: number; discount: number; total: number };
  segment?: 'residential' | 'commercial';
  lineItems: Array<{ description: string; amount: number }>;
}

const COMMERCIAL_RATES: Record<string, number> = {
  'Weekly Exterior': 4.25,
  'Biweekly Exterior': 4.75,
  'Monthly Exterior': 5.50,
  'Monthly Interior + Exterior': 7.00,
  'Quarterly Interior + Exterior': 8.00,
  'One-Time Clean': 15.00,
};

const RESIDENTIAL_RATES = {
  exteriorWindow: 10,
  interiorWindow: 7,
  screen: 5,
  secondStoryUpcharge: 2,
  thirdStoryUpcharge: 5,
};

export function computeQuote(body: QuoteBody): QuoteResult {
  const f = body.formInput;
  const isCommercial = f.propertyType === 'Commercial';
  const segment = isCommercial ? 'commercial' : 'residential';

  let totalCents = 0;
  let subtotalCents = 0;
  let discountCents = 0;
  let lineItems: Array<{ description: string; amount: number } | null> = [];

  const windowCount = Math.max(0, Number(f.windowCount) || 0);

  if (isCommercial) {
    // === COMMERCIAL LOGIC ===
    const serviceType = f.serviceType || 'One-Time Clean';
    const baseRate = COMMERCIAL_RATES[serviceType] || 15.00; 
    const baseCost = windowCount * baseRate;

    lineItems.push({
      description: `${serviceType} (${windowCount} panes @ $${baseRate.toFixed(2)})`,
      amount: baseCost
    });

    let upliftCost = 0;
    const hasUplift = f.additionalServices?.includes('First-Time Uplift');
    if (hasUplift) {
      upliftCost = baseCost * 0.30;
      lineItems.push({
        description: 'First-Time Restore to Standard Uplift (+30%)',
        amount: upliftCost
      });
    }

    subtotalCents = (baseCost + upliftCost) * 100;

  } else {
    // === RESIDENTIAL LOGIC ===
    const screenCount = Math.max(0, Number(f.screenCount) || 0);
    const serviceType = f.serviceType || 'Exterior Only';
    
    // Determine Base Rate per Window
    let perWindowRate = 0;
    if (serviceType === 'Interior + Exterior' || serviceType === 'both') {
      perWindowRate = RESIDENTIAL_RATES.exteriorWindow + RESIDENTIAL_RATES.interiorWindow; // 17
    } else {
      perWindowRate = RESIDENTIAL_RATES.exteriorWindow; // 10
    }

    // Story Upcharge
    let storyUpcharge = 0;
    const stories = f.stories || '1';
    if (stories === '2') {
      storyUpcharge = RESIDENTIAL_RATES.secondStoryUpcharge;
    } else if (['3', '4+', '3+'].includes(stories)) {
      storyUpcharge = RESIDENTIAL_RATES.thirdStoryUpcharge;
    }
    
    const finalRate = perWindowRate + storyUpcharge;
    const windowTotal = windowCount * finalRate;
    const screenTotal = screenCount * RESIDENTIAL_RATES.screen;

    // Line Items
    // 1. Window Cleaning
    let windowDesc = `${serviceType} Window Cleaning`;
    if (storyUpcharge > 0) windowDesc += ` (${stories} Stories)`;
    
    lineItems.push({
      description: `${windowDesc} (${windowCount} windows @ $${finalRate.toFixed(2)})`,
      amount: windowTotal
    });
    
    // 2. Screen Cleaning
    if (screenCount > 0) {
      lineItems.push({ 
        description: `Screen Cleaning (${screenCount} screens @ $${RESIDENTIAL_RATES.screen.toFixed(2)})`, 
        amount: screenTotal 
      });
    }

    subtotalCents = (windowTotal + screenTotal) * 100;
  }

  // === HIGH TRAFFIC / KUTARITSU NOTE (Both Segments) ===
  const hasKutaritsu = f.additionalServices?.some(s => s.includes('Kutaritsu') || s.includes('High Traffic'));
  if (hasKutaritsu) {
    lineItems.push({
      description: 'High Traffic / Kutaritsu Clean (Pricing to be confirmed upon review)',
      amount: 0
    });
  }

  // === DISCOUNTS ===
  const code = (f.couponCode ?? '').trim().toLowerCase();
  const discountRates: Record<string, number> = {
    '1stclean': 0.1,
    ptpsc: 0.15,
    refer5: 0.2,
  };
  const rate = discountRates[code] ?? 0;
  discountCents = Math.round(subtotalCents * rate);
  totalCents = Math.max(0, subtotalCents - discountCents);

  return {
    totalCents,
    breakdown: {
      subtotal: Math.round(subtotalCents / 100),
      discount: Math.round(discountCents / 100),
      total: Math.round(totalCents / 100),
    },
    segment,
    lineItems: lineItems.filter((item): item is { description: string; amount: number } => item !== null),
  };
}
