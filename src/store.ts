export const store = {
  async list(_table: string): Promise<unknown[]> { return []; },
  async put(_table: string, _id: string, _row: unknown): Promise<void> {},
  async remove(_table: string, _id: string): Promise<void> {},
};
