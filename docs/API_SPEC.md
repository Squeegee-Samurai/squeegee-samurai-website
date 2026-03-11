## Purpose

This document defines the canonical API contract for the Squeegee Samurai MVP submission flow.

This file exists primarily for AI coding agents such as Cursor, Antigravity, Copilot, and other IDE assistants so they can safely refactor, validate, and extend the submission flow without changing the intended behavior.

This API is intentionally simple and stateless.

There is no database, no PDF generation, and no file storage in the MVP architecture.

---

# Endpoint Summary

## Submit Estimate

**Method**

```http
POST /api/submit-estimate
```

**Purpose**

Accept a completed estimate payload from the frontend and send:

1. a full estimate email to the business owner
2. an optional confirmation email to the customer

**Authentication**

None for MVP.

**Content-Type**

```http
application/json
```

---

# Architecture Constraints

Agents must preserve the following constraints:

* The endpoint is stateless
* The endpoint must not write to a database
* The endpoint must not generate PDFs
* The endpoint must not upload files
* The endpoint must not depend on Supabase
* The endpoint must not introduce background jobs or queues unless explicitly requested

---

# Request Contract

## Request Body

```json
{
  "customer": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "555-555-5555"
  },
  "property": {
    "address": "123 Main St, Fairfax, VA",
    "type": "residential"
  },
  "estimate": {
    "line_items": [
      {
        "label": "Exterior Windows",
        "quantity": 12,
        "unit_price": 10,
        "total": 120
      },
      {
        "label": "Screens",
        "quantity": 8,
        "unit_price": 5,
        "total": 40
      }
    ],
    "subtotal": 160,
    "uplift": 20,
    "total": 180
  },
  "notes": "Please contact me after 3 PM.",
  "timestamp": "2026-03-11T19:45:00.000Z",
  "app_version": "design-refresh-2-8"
}
```

---

# Field Definitions

## customer

| Field   | Type   | Required | Notes                      |
| ------- | ------ | -------: | -------------------------- |
| `name`  | string |      Yes | Customer full name         |
| `email` | string |      Yes | Must be valid email format |
| `phone` | string |       No | Optional phone number      |

## property

| Field     | Type   | Required | Notes                                        |
| --------- | ------ | -------: | -------------------------------------------- |
| `address` | string |      Yes | Service address                              |
| `type`    | string |      Yes | Expected values: `residential`, `commercial` |

## estimate

| Field        | Type   | Required | Notes                                  |
| ------------ | ------ | -------: | -------------------------------------- |
| `line_items` | array  |      Yes | Array of estimate rows                 |
| `subtotal`   | number |      Yes | Sum before uplift/adjustments          |
| `uplift`     | number |       No | Additional pricing amount; default `0` |
| `total`      | number |      Yes | Final estimate total                   |

## estimate.line_items[]

| Field        | Type   | Required | Notes                         |
| ------------ | ------ | -------: | ----------------------------- |
| `label`      | string |      Yes | Human-readable line item name |
| `quantity`   | number |       No | Optional quantity             |
| `unit_price` | number |       No | Optional unit price           |
| `total`      | number |      Yes | Total for line item           |

## other root fields

| Field         | Type   | Required | Notes                             |
| ------------- | ------ | -------: | --------------------------------- |
| `notes`       | string |       No | Optional customer notes           |
| `timestamp`   | string |      Yes | ISO-8601 timestamp from client    |
| `app_version` | string |       No | Optional build/version identifier |

---

# Validation Rules

The serverless endpoint must validate the payload before attempting email delivery.

## Required validations

* `customer.name` must exist and be a non-empty string
* `customer.email` must exist and be a valid email string
* `property.address` must exist and be a non-empty string
* `property.type` must exist and be either `residential` or `commercial`
* `estimate.line_items` must exist and be an array
* `estimate.total` must exist and be a valid number
* `timestamp` must exist and be a valid ISO-like datetime string

## Numeric validations

If present, these fields must be numeric:

* `estimate.subtotal`
* `estimate.uplift`
* `estimate.total`
* `estimate.line_items[].quantity`
* `estimate.line_items[].unit_price`
* `estimate.line_items[].total`

## Safe defaults

If omitted, the server may safely normalize:

* `customer.phone` → `""`
* `notes` → `""`
* `estimate.uplift` → `0`
* `app_version` → `"unknown"`

## Sanitization expectations

The server should sanitize or normalize:

* leading/trailing whitespace in text fields
* unsafe HTML content if email templates render user text
* blank optional strings to empty strings

---

# Recommended TypeScript Types

```ts
export type PropertyType = "residential" | "commercial";

export interface EstimateLineItem {
  label: string;
  quantity?: number;
  unit_price?: number;
  total: number;
}

export interface SubmitEstimateRequest {
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  property: {
    address: string;
    type: PropertyType;
  };
  estimate: {
    line_items: EstimateLineItem[];
    subtotal: number;
    uplift?: number;
    total: number;
  };
  notes?: string;
  timestamp: string;
  app_version?: string;
}
```

---

# Server Behavior

## Successful flow

On a valid request, the endpoint should:

1. validate request body
2. normalize/sanitize fields
3. format owner email
4. send owner email
5. optionally send customer confirmation email
6. return success response

## Owner email is authoritative

The owner email is the primary delivery requirement.

If customer confirmation fails but owner email succeeds, the API may still return success, while optionally including a warning field in the response.

If owner email fails, the API must return an error.

---

# Response Contract

## Success Response

**HTTP Status**

```http
200 OK
```

**Body**

```json
{
  "ok": true,
  "message": "Estimate submitted successfully."
}
```

## Success Response with customer-email warning

**HTTP Status**

```http
200 OK
```

**Body**

```json
{
  "ok": true,
  "message": "Estimate submitted successfully.",
  "warning": "Owner email sent, but customer confirmation email failed."
}
```

## Validation Error Response

**HTTP Status**

```http
400 Bad Request
```

**Body**

```json
{
  "ok": false,
  "error": "Invalid request payload.",
  "details": [
    "customer.email is required",
    "property.address is required"
  ]
}
```

## Method Not Allowed

**HTTP Status**

```http
405 Method Not Allowed
```

**Body**

```json
{
  "ok": false,
  "error": "Method not allowed."
}
```

## Server Error

**HTTP Status**

```http
500 Internal Server Error
```

**Body**

```json
{
  "ok": false,
  "error": "Failed to submit estimate."
}
```

---

# Email Requirements

## Owner Email

**Recipient**

```text
OWNER_EMAIL
```

**Required content**

* customer name
* customer email
* customer phone
* property address
* property type
* line items
* subtotal
* uplift
* total estimate
* notes
* timestamp
* app version if present

**Suggested subject**

```text
New Estimate Request — {customer.name} — ${estimate.total}
```

## Customer Confirmation Email

**Recipient**

```text
customer.email
```

**Optional via env flag**

```text
ENABLE_CUSTOMER_CONFIRMATION=true
```

**Required content**

* thank-you message
* estimate summary
* disclaimer that final pricing may vary
* business contact information if available

**Suggested subject**

```text
Your Squeegee Samurai Estimate
```

---

# Environment Variables

Required:

```text
RESEND_API_KEY
OWNER_EMAIL
APP_ENV
```

Optional:

```text
ENABLE_CUSTOMER_CONFIRMATION=true
FROM_EMAIL
REPLY_TO_EMAIL
```

Agents must never hardcode secrets or recipient addresses in application logic.

---

# Frontend Expectations

The frontend should:

* calculate estimate before submission
* display estimate to the customer in-browser
* collect customer contact info before POST request
* send JSON payload matching this spec
* handle loading, success, and retry states
* show error feedback if the endpoint returns failure

The frontend must not assume database persistence exists.

---

# Backward Compatibility Rule

AI agents must not rename or reshape the request contract without updating:

1. frontend submit logic
2. server validation
3. email formatting logic
4. this `docs/API_SPEC.md` file

If a field changes, this spec must be updated in the same change set.

---

# Non-Goals for MVP

The following are explicitly out of scope:

* database persistence
* quote history
* PDF generation
* file attachments
* CRM API integration
* background processing
* user accounts
* admin dashboard
* analytics storage

---

# Implementation Notes for Agents

Agents should prefer:

* small pure validation helpers
* shared TypeScript types for request payload
* centralized email formatting utilities
* minimal dependencies
* clear HTTP responses

Agents should avoid:

* adding ORM packages
* introducing Supabase clients
* adding storage SDKs
* using filesystem writes
* inventing additional API endpoints unless necessary

---

# Example Minimal Success Criteria

A valid implementation is considered complete when:

* the frontend sends the expected payload
* the endpoint validates and rejects malformed requests
* the owner receives the formatted estimate email
* the customer optionally receives a confirmation email
* the response contract matches this spec
* no database or file storage is used

---

# Source of Truth

If implementation behavior differs from older repo documents, this file and the current MVP architecture docs take precedence for the submission flow.

The authoritative submission model is:

Estimate displayed in browser
→ payload submitted to serverless endpoint
→ owner email sent
→ optional customer confirmation sent
