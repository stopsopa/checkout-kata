import type IRuleFinder from "../interfaces/iRuleFinder.ts";

import { inArray } from "drizzle-orm";

import { db, schema } from "../../database/db.ts";

type RuleType = typeof schema.rules.$inferSelect;

export default class RuleFinder implements IRuleFinder<RuleType, string> {
  async findRules(uniqueItems: string[]): Promise<RuleType[]> {
    /**
     * This is actually a more important point of this second implementation.
     * 
     * Because after extracting unique item types from the basket, we can now make a database query to get rules 
     * just for this subset of items, and process these together with the entire basket to calculate the total price.
     * 
     * And usually this will be a reasonable amount of rules.
     * 
     * Assuming the user will not add to the basket hundreds (or more) different types of items.
     * 
     * If that were the case, then further optimization would be needed. 
     * 
     * ... and I guess I have to stop somewhere.
     */
    const rules = await db.select().from(schema.rules).where(inArray(schema.rules.sku, uniqueItems));

    return rules;
  }
}
