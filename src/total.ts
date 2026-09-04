export type LineItem = {
  sku: string;
  description: string;
  amountCents: number;
  refunded: boolean;
};

export type OrderTotal = {
  subtotalCents: number;
  taxCents: number;
  totalCents: number;
};

export const TAX_RATE = 0.08;

/** Sum of the order's line items, plus tax. */
export function orderTotal(items: LineItem[]): OrderTotal {
  const subtotalCents = items.reduce((sum, item) => sum + item.amountCents, 0);
  const taxCents = Math.round(subtotalCents * TAX_RATE);
  return { subtotalCents, taxCents, totalCents: subtotalCents + taxCents };
}

export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
