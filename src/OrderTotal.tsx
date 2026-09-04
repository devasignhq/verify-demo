import { formatCents, type OrderTotal as Totals } from "./total.js";

export type OrderTotalProps = {
  customer: string;
  totals: Totals;
};

export function OrderTotal({ customer, totals }: OrderTotalProps) {
  return (
    <section>
      <h1>Order for {customer}</h1>
      <dl>
        <dt>Subtotal</dt>
        <dd data-testid="subtotal">{formatCents(totals.subtotalCents)}</dd>
        <dt>Tax</dt>
        <dd data-testid="tax">{formatCents(totals.taxCents)}</dd>
        <dt>Refunds</dt>
        <dd data-testid="refunds">{formatCents(0)}</dd>
        <dt>Total</dt>
        <dd data-testid="total">{formatCents(totals.totalCents)}</dd>
      </dl>
    </section>
  );
}
