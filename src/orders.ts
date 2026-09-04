import type { LineItem } from "./total.js";

export type Order = { id: string; customer: string; items: LineItem[] };

export const ORDERS: Order[] = [
  {
    id: "1001",
    customer: "Ada Lovelace",
    items: [
      { sku: "a", description: "Desk lamp", amountCents: 4500, refunded: false },
      { sku: "b", description: "Notebook", amountCents: 1200, refunded: false },
      { sku: "c", description: "Standing desk", amountCents: 32000, refunded: true },
    ],
  },
  {
    id: "1002",
    customer: "Grace Hopper",
    items: [
      { sku: "d", description: "Keyboard", amountCents: 8900, refunded: false },
    ],
  },
];

export function findOrder(id: string): Order | undefined {
  return ORDERS.find((o) => o.id === id);
}
