// Serves the built frontend and the orders API on one port. The order maths
// comes from src/total.ts, so the API and the unit tests share one source.
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { findOrder } from "./src/orders.js";
import { orderTotal } from "./src/total.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT || 4173);

app.get("/api/orders/:id/total", (req, res) => {
  const order = findOrder(req.params.id);
  if (!order) return res.status(404).json({ error: "order_not_found" });
  res.json({ customer: order.customer, ...orderTotal(order.items) });
});

app.use(express.static(path.join(root, "dist")));
app.get("*", (_req, res) => res.sendFile(path.join(root, "dist", "index.html")));

app.listen(PORT, () => console.log(`verify-demo listening on http://localhost:${PORT}`));
