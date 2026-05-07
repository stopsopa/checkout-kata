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
}
