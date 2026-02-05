# API Contract – Squeegee Samurai

## Base URL
- Local: `http://localhost:3000`
- Production: set via `VITE_API_URL` or same-origin proxy

---

## POST /api/quote

Submit a quote request. Server validates, recomputes quote, stores lead, sends owner email.

### Request
`Content-Type: application/json`

```json
{
  "contact": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "phone": "string (optional)",
    "address": "string (optional)",
    "city": "string (optional)",
    "zipCode": "string (optional)"
  },
  "formInput": {
    "propertyType": "string (optional)",
    "serviceType": "interior | exterior | Interior+Exterior",
    "windowCount": number,
    "screenCount": number,
    "stories": "string (optional)",
    "frequency": "string (optional)",
    "additionalServices": ["string"],
    "specialRequests": "string (optional)",
    "preferredContact": "string (optional)",
    "bestTimeToCall": "string (optional)",
    "couponCode": "string (optional)",
    "imageUrls": ["string (optional)"]
  }
}
```

### Response (201)
```json
{
  "success": true,
  "quoteId": "uuid",
  "total": 123,
  "breakdown": { "subtotal": 100, "discount": 10, "total": 90 },
  "message": "Quote received. We'll be in touch within 24 hours."
}
```

### Response (400)
Validation error: `{ "success": false, "error": "message" }`

### Response (500)
Server error: `{ "success": false, "error": "message" }`

---

## GET /api/health

Liveness/readiness. No auth.

### Response (200)
```json
{
  "status": "ok",
  "service": "squeegee-samurai-api",
  "timestamp": "ISO8601"
}
```
