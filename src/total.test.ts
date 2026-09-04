import { describe, expect, it } from "vitest";
import { formatCents, orderTotal } from "./total.js";

const items = [
  { sku: "a", description: "Desk lamp", amountCents: 4500, refunded: false },
  { sku: "b", description: "Notebook", amountCents: 1200, refunded: false },
];

describe("orderTotal", () => {
  it("adds tax to the subtotal", () => {
    const total = orderTotal(items);
    expect(total.subtotalCents).toBe(5700);
    expect(total.taxCents).toBe(456);
    expect(total.totalCents).toBe(6156);
  });

  it("handles an empty order", () => {
    expect(orderTotal([])).toEqual({ subtotalCents: 0, taxCents: 0, totalCents: 0 });
  });
});

describe("formatCents", () => {
  it("renders whole and fractional dollars", () => {
    expect(formatCents(6156)).toBe("$61.56");
    expect(formatCents(0)).toBe("$0.00");
  });
});
