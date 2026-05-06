import type IRuleFinder from "../interfaces/iRuleFinder.ts";

import { inArray } from "drizzle-orm";

import { db, schema } from "../../database/db.ts";

type RuleType = typeof schema.rules.$inferSelect;

export default class RuleFinder implements IRuleFinder<RuleType, string> {
  async findRules(uniqueItems: string[]): Promise<RuleType[]> {
    const rules = await db.select().from(schema.rules).where(inArray(schema.rules.sku, uniqueItems));

    return rules;
  }
}
