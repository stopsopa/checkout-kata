import { inArray } from "drizzle-orm";

import { db, schema } from "../../database/db.ts";

import AbstractCheckout from "../interfaces/AbstractCheckout.ts";

type RuleType = typeof schema.rules.$inferSelect;

/**
 * I've introduced separate Checkout classes for in memory and in database
 * implementations to introduce point in code where we can create new Checkout
 * implementations by just injecting different types but if internally these should be
 * handled differently then this is the level where we can override methods from AbstractCheckout
 */
export default class Checkout extends AbstractCheckout<string, number, RuleType> {
  async findRules(uniqueItems: string[]): Promise<RuleType[]> {
    const rules = await db.select().from(schema.rules).where(inArray(schema.rules.sku, uniqueItems));

    return rules;
  }
}
