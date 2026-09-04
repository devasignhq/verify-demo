# verify-demo

A small orders app used to exercise DevAsign's PR verification end to end.

- `src/total.ts` — order maths (subtotal, tax, total)
- `src/OrderTotal.tsx` — renders the breakdown
- `server.mjs` — serves the built frontend and `GET /api/orders/:id/total`

```bash
npm ci
npm run build
npm start   # http://localhost:4173
npm test
```
