import AbstractCheckout from "../interfaces/AbstractCheckout.ts";

import Ver1Rule from "./Ver1Rule.ts";

export default class Checkout extends AbstractCheckout<string, number, Ver1Rule> {
  protected rules: Ver1Rule[];
  constructor(rules: Ver1Rule[]) {
    super();
    this.rules = rules;
  }
  async findRules(uniqueItems: string[]): Promise<Ver1Rule[]> {
    return this.rules.filter((rule) => uniqueItems.includes(rule.sku));
  }

  protected getItemIdentity(item: string): string {
    return item;
  }
  protected getRuleIdentity(rule: Ver1Rule): string {
    return rule.sku;
  }
  protected getRuleCountActivator(rule: Ver1Rule): number {
    return rule.countActivator;
  }
  protected getRulePrice(rule: Ver1Rule): number {
    return rule.price;
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
