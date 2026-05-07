import { inArray } from "drizzle-orm";

import { db, schema } from "../../database/db.ts";

import AbstractCheckout from "../interfaces/AbstractCheckout.ts";

type RuleType = typeof schema.rules.$inferSelect;

export default class Checkout extends AbstractCheckout<string, number, RuleType> {
  async findRules(uniqueItems: string[]): Promise<RuleType[]> {
    return await db.select().from(schema.rules).where(inArray(schema.rules.sku, uniqueItems));
  }

  protected getItemIdentity(item: string): string {
    return item;
  }
  protected getRuleIdentity(rule: RuleType): string {
    return rule.sku;
  }
  protected getRuleCountActivator(rule: RuleType): number {
    return rule.countActivator;
  }
  protected getRulePrice(rule: RuleType): number {
    return Number(rule.price);
  }
  protected getZeroPrice(): number {
    return 0;
  }
  protected addPrices(a: number, b: number): number {
    return a + b;
  }
  protected multiplyPrice(price: number, times: number): number {
    return price * times;
  }
}
