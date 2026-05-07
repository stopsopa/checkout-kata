import { inArray } from "drizzle-orm";

import { db, schema } from "../../database/db.ts";

import AbstractCheckout from "../interfaces/AbstractCheckout.ts";

type RuleType = typeof schema.rules.$inferSelect;

export default class Checkout extends AbstractCheckout<string, number, RuleType> {
  async findRules(uniqueItems: string[]): Promise<RuleType[]> {
    return await db.select().from(schema.rules).where(inArray(schema.rules.sku, uniqueItems));
  }
}
