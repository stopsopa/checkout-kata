import type IRuleFinder from "../interfaces/iRuleFinder.ts";
import type Ver1Rule from "./Ver1Rule.ts";

export default class RuleFinder implements IRuleFinder<Ver1Rule, string> {
  protected rules: Ver1Rule[];
  constructor(rules: Ver1Rule[]) {
    this.rules = rules;
  }
  async findRules(uniqueItems: string[]): Promise<Ver1Rule[]> {
    return this.rules.filter((rule) => uniqueItems.includes(rule.sku));
  }
}
