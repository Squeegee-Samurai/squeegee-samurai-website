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
    propertyType?: string;
    serviceType?: string;
    windowCount?: number;
    screenCount?: number;
    stories?: string;
    frequency?: string;
    additionalServices?: string[];
    specialRequests?: string;
    preferredContact?: string;
    bestTimeToCall?: string;
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

const COMMERCIAL_PROPS = new Set([
  'Office Building',
  'Retail Store',
  'Restaurant',
  'Other Commercial',
]);

function inferSegment(propertyType?: string): 'residential' | 'commercial' | undefined {
  if (!propertyType) return undefined;
  return COMMERCIAL_PROPS.has(propertyType) ? 'commercial' : 'residential';
}

export function computeQuote(body: QuoteBody): QuoteResult {
  const f = body.formInput;
  const windowCount = Math.max(0, Number(f.windowCount) || 0);
  const screenCount = Math.max(0, Number(f.screenCount) || 0);

  const pricePerWindow =
    f.serviceType === 'interior' ? 7 : f.serviceType === 'exterior' ? 10 : 17;
  
  const windowTotal = windowCount * pricePerWindow;
  const screenTotal = screenCount * 5;
  const baseFee = 50;

  const subtotalCents = (windowTotal + screenTotal + baseFee) * 100;

  const code = (f.couponCode ?? '').trim().toLowerCase();
  const discountRates: Record<string, number> = {
    '1stclean': 0.1,
    ptpsc: 0.15,
    refer5: 0.2,
  };
  const rate = discountRates[code] ?? 0;
  const discountCents = Math.round(subtotalCents * rate);
  const totalCents = Math.max(0, subtotalCents - discountCents);

  const rawLineItems = [
    { 
      description: `${f.serviceType ? f.serviceType.charAt(0).toUpperCase() + f.serviceType.slice(1) : 'Window'} Cleaning (${windowCount} windows @ $${pricePerWindow})`, 
      amount: windowTotal 
    },
    screenCount > 0 
      ? { description: `Screen Cleaning (${screenCount} screens @ $5)`, amount: screenTotal } 
      : null,
    { description: 'Service Call / Setup Fee', amount: baseFee },
  ];

  const lineItems = rawLineItems.filter((item): item is { description: string; amount: number } => item !== null);

  return {
    totalCents,
    breakdown: {
      subtotal: Math.round(subtotalCents / 100),
      discount: Math.round(discountCents / 100),
      total: Math.round(totalCents / 100),
    },
    segment: inferSegment(f.propertyType),
    lineItems,
  };
}
