export type LineItem = {
  sku: string;
  description: string;
  amountCents: number;
  refunded: boolean;
};

export type OrderTotal = {
  subtotalCents: number;
  taxCents: number;
  refundsCents: number;
  totalCents: number;
};

export const TAX_RATE = 0.08;

/** Sum of the order's charged line items, plus tax. Refunded items are excluded. */
export function orderTotal(items: LineItem[]): OrderTotal {
  const charged = items.filter((item) => !item.refunded);
  const subtotalCents = charged.reduce((sum, item) => sum + item.amountCents, 0);
  const refundsCents = items.filter((item) => item.refunded).reduce((sum, item) => sum + item.amountCents, 0);
  const taxCents = Math.round(subtotalCents * TAX_RATE);
  return { subtotalCents, taxCents, refundsCents, totalCents: subtotalCents + taxCents };
}

export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
