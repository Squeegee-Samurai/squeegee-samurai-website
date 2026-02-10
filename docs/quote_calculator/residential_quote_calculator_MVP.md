---
name: Residential Pricing Calculator
overview: Convert the residential form into a stepped calculator with live pricing estimates, similar to the commercial calculator. Users will input their window details and see instant pricing for different service frequency options.
todos:
  - id: add-pricing-constants
    content: Add RESIDENTIAL_PRICING constants to FreeEstimate.tsx
    status: completed
  - id: create-calc-function
    content: Create calculateResidentialQuote() function
    status: completed
  - id: convert-to-stepped
    content: Convert ResidentialForm to stepped calculator with state management
    status: completed
  - id: build-step1
    content: Build Step 1 UI - input form for windows, stories, screens
    status: completed
  - id: build-step2
    content: Build Step 2 UI - pricing table with live calculations
    status: completed
  - id: build-step3
    content: Build Step 3 UI - contact/details form
    status: completed
  - id: update-api-submission
    content: Update API submission to include calculated pricing
    status: completed
  - id: test-pricing-logic
    content: Test all pricing scenarios and edge cases
    status: completed
isProject: false
---

# Residential Pricing Calculator Integration

## Overview

Transform the residential estimate form from a static submission form into an interactive stepped calculator that shows live pricing estimates based on user inputs.

## Pricing Model (from image)

- **Exterior windows**: $10 per window
- **Interior windows**: $7 per window  
- **Screens**: $5 per screen
- **2nd story**: +$2 per window
- **3rd story**: +$5 per window

## Implementation Steps

### 1. Add Residential Pricing Constants

**File**: `[frontend/src/pages/FreeEstimate.tsx](frontend/src/pages/FreeEstimate.tsx)` (lines 12-21)

Add residential pricing structure after the existing commercial `PRICING` constant:

```typescript
const RESIDENTIAL_PRICING = {
  exteriorWindow: 10,
  interiorWindow: 7,
  screen: 5,
  secondStoryUpcharge: 2,  // per window
  thirdStoryUpcharge: 5,   // per window
};
```

### 2. Create Residential Calculation Function

**File**: `[frontend/src/pages/FreeEstimate.tsx](frontend/src/pages/FreeEstimate.tsx)` (after line 86)

Create a calculation function similar to `calculateQuotes()` for commercial:

```typescript
interface ResidentialInputs {
  windowCount: number;
  interiorExterior: 'Exterior Only' | 'Interior + Exterior';
  stories: '1' | '2' | '3' | '4+';
  screenCount: number;
  serviceFrequency: string;
}

function calculateResidentialQuote(inputs: ResidentialInputs) {
  const { windowCount, interiorExterior, stories, screenCount } = inputs;
  
  // Base window cost
  let windowCost = 0;
  if (interiorExterior === 'Exterior Only') {
    windowCost = windowCount * RESIDENTIAL_PRICING.exteriorWindow;
  } else {
    // Interior + Exterior
    windowCost = windowCount * (RESIDENTIAL_PRICING.interiorWindow + RESIDENTIAL_PRICING.exteriorWindow);
  }
  
  // Story upcharge
  if (stories === '2') {
    windowCost += windowCount * RESIDENTIAL_PRICING.secondStoryUpcharge;
  } else if (stories === '3' || stories === '4+') {
    windowCost += windowCount * RESIDENTIAL_PRICING.thirdStoryUpcharge;
  }
  
  // Screen cost
  const screenCost = screenCount * RESIDENTIAL_PRICING.screen;
  
  return {
    baseTotal: windowCost + screenCost,
    windowCost,
    screenCost,
    breakdown: {
      windows: windowCount,
      windowRate: interiorExterior,
      stories,
      screens: screenCount,
    }
  };
}
```

### 3. Convert ResidentialForm to Stepped Calculator

**File**: `[frontend/src/pages/FreeEstimate.tsx](frontend/src/pages/FreeEstimate.tsx)` (lines 448-691)

**Current structure**: Single long form that submits directly

**New structure**: 

- **Step 1**: Input form (windows, interior/exterior, stories, screens)
- **Step 2**: Pricing table showing estimate + service frequency options
- **Step 3**: Contact/details form (name, address, preferences, additional services)

### 4. Step 1 - Basic Input Form

Replace the current monolithic form with a stepped approach:

```typescript
const [step, setStep] = useState(1);
const [residentialInputs, setResidentialInputs] = useState<ResidentialInputs>({
  windowCount: 0,
  interiorExterior: 'Exterior Only',
  stories: '1',
  screenCount: 0,
  serviceFrequency: 'One-Time',
});
```

Step 1 UI collects:

- Number of windows
- Interior/Exterior selection
- Number of stories
- Number of screens

### 5. Step 2 - Pricing Display

Similar to commercial calculator (lines 220-390), show:

- Calculated base price
- Breakdown (windows, stories, screens)
- Service frequency options (One-time, Monthly, Quarterly, etc.)
- "Get Detailed Quote" button to proceed

### 6. Step 3 - Contact Form

Collect remaining details:

- Contact information (name, email, phone)
- Property information (address, city, ZIP, property type)
- Additional services (checkboxes)
- Contact preferences

### 7. Update API Submission

**File**: `[frontend/src/pages/FreeEstimate.tsx](frontend/src/pages/FreeEstimate.tsx)` (lines 491-536)

Modify the `handleSubmit` function to include calculated pricing in the submission:

```typescript
formInput: {
  propertyType: 'Residential',
  serviceType: residentialInputs.serviceFrequency,
  windowCount: residentialInputs.windowCount,
  screenCount: residentialInputs.screenCount,
  interiorExterior: residentialInputs.interiorExterior,
  stories: residentialInputs.stories,
  estimatedPrice: calculatedQuote.baseTotal, // Add calculated price
  additionalServices: formData.additionalServices,
  specialRequests: specialRequests || undefined,
},
```

## UI/UX Flow Diagram

```mermaid
flowchart TD
    Start[User Selects Residential] --> Step1[Step 1: Input Details]
    Step1 --> |Enter: Windows, I/E, Stories, Screens| Calculate[Calculate Live Pricing]
    Calculate --> Step2[Step 2: Show Pricing Table]
    Step2 --> |Display: Base Price + Frequency Options| Review[User Reviews Estimate]
    Review --> Step3[Step 3: Get Detailed Quote Button]
    Step3 --> |Opens Contact Form| Form[Contact Form]
    Form --> |Submit| API[POST to /api/quote]
    API --> ThankYou[Navigate to Thank You Page]
```



## Key Files to Modify

1. `**[frontend/src/pages/FreeEstimate.tsx](frontend/src/pages/FreeEstimate.tsx)**`
  - Add `RESIDENTIAL_PRICING` constants (after line 21)
  - Add `calculateResidentialQuote()` function (after line 86)
  - Refactor `ResidentialForm` component to stepped calculator (lines 448-691)
  - Update state management for steps
  - Add pricing display UI
2. `**[api/src/quote.ts](api/src/quote.ts)**` (optional backend update)
  - May need to add fields for `interiorExterior`, `stories`, `estimatedPrice`
  - Validation for new residential-specific fields

## Testing Checklist

- Pricing calculates correctly for exterior-only windows
- Pricing calculates correctly for interior + exterior
- Story upcharges apply correctly (2nd = +$2, 3rd = +$5)
- Screen costs calculated correctly
- Step navigation works smoothly
- Form submission includes all data
- Backend receives and stores estimate

## Advanced Cleaning Option

### Kutaritsu Clean for High Traffic Areas

Both residential and commercial calculators include an optional checkbox for requesting information about advanced cleaning services:

- **Label**: "Add High Traffic with Kutaritsu Clean"
- **Description**: "More information will be included in your final estimate"
- **Location**: Displayed in the pricing table section, before the "Get Detailed Quote" button
- **Behavior**: 
  - No price calculation at form stage
  - Simply flags the request in the API submission
  - Added to `specialRequests` field as: "Requested: High Traffic with Kutaritsu Clean (more info needed)"
  - Sales team provides pricing details in follow-up communication

### Implementation

```typescript
// Residential: Add to contactData state
const [contactData, setContactData] = useState({
  // ... other fields
  requestAdvancedCleaning: false,
});

// Commercial: Add to inputs state
const [inputs, setInputs] = useState({
  // ... other fields
  requestAdvancedCleaning: false,
});

// UI Component (both calculators)
<div className="mt-4 p-4 bg-gradient-to-br from-indigo-50 to-washi-50 border border-indigo-100 rounded-lg">
  <label className="flex items-start gap-3 cursor-pointer">
    <input
      type="checkbox"
      checked={state.requestAdvancedCleaning}
      onChange={(e) => setState((prev) => ({ ...prev, requestAdvancedCleaning: e.target.checked }))}
      className="mt-1 h-4 w-4 border-sumi-300 text-indigo-600 focus:ring-indigo-500"
    />
    <div>
      <span className="text-sm font-medium text-sumi-800">
        Add High Traffic with Kutaritsu Clean
      </span>
      <p className="text-xs text-sumi-600 mt-1">
        More information will be included in your final estimate
      </p>
    </div>
  </label>
</div>
```

## Notes

- Keep the current commercial calculator unchanged
- Maintain the same visual design language (Japanese minimalist aesthetic)
- Ensure mobile responsiveness for all steps
- Pricing is an estimate - disclaimer text remains important
- Advanced cleaning option requires no price calculation - information only

