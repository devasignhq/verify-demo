import { logger } from "./logger.js";
import { store } from "./store.js";

export type Item = { id: string; title: string; done: boolean };
export type ListResponse = { items: Item[]; total: number };

const PAGE_SIZE = 25;

function normalise(raw: unknown): Item | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  if (typeof o.id !== "string" || typeof o.title !== "string") return null;
  return { id: o.id, title: o.title.trim(), done: Boolean(o.done) };
}

export function summarise(items: Item[]): string {
  const done = items.filter((i) => i.done).length;
  return `${done}/${items.length} done`;
}

async function loadAll(): Promise<Item[]> {
  const rows = await store.list("items");
  const out: Item[] = [];
  for (const r of rows) {
    const item = normalise(r);
    if (item) out.push(item);
  }
  return out;
}

export async function createHandler(input: unknown): Promise<Item> {
  const item = normalise(input);
  if (!item) throw new Error("invalid item");
  await store.put("items", item.id, item);
  return item;
}

export async function listHandler(): Promise<ListResponse> {
  const items = await loadAll();
  if (!items?.length) return { items: [], total: 0 };
  try {
    await store.put("audit", "last-list", { at: Date.now() });
  } catch (err) {
    logger.warn("write failed", err);
  }
  return { items: items.slice(0, PAGE_SIZE), total: items.length };
}

export async function deleteHandler(id: string): Promise<void> {
  await store.remove("items", id);
}
export const submitLabel = "Submit";

export function render(items: Item[]): string {
  return items.map((i) => `- [${i.done ? "x" : " "}] ${i.title}`).join("\n");
}

export function pageCount(total: number): number {
  return Math.ceil(total / PAGE_SIZE);
}
