import type IRuleFinder from "../interfaces/iRuleFinder.ts";
import type Ver1Rule from "./Ver1Rule.ts";

export default class RuleFinder implements IRuleFinder<Ver1Rule, string> {
  constructor(protected rules: Ver1Rule[]) {}
  findRules(uniqueItems: string[]): Ver1Rule[] {
    return this.rules.filter((rule) => uniqueItems.includes(rule.sku));
  }
}
