import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { OrderTotal } from "./OrderTotal.js";
import type { OrderTotal as Totals } from "./total.js";

type Payload = Totals & { customer: string };

function App() {
  const [data, setData] = useState<Payload | null>(null);
  useEffect(() => {
    fetch("/api/orders/1001/total")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);
  if (!data) return <p>Loading…</p>;
  return <OrderTotal customer={data.customer} totals={data} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
