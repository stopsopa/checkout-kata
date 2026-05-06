import type IRuleFinder from "../interfaces/iRuleFinder.ts";

export default class RuleFinder<RuleType, UniqueCriteria> implements IRuleFinder<RuleType, UniqueCriteria> {
  findRules(uniqueItems: UniqueCriteria[]): RuleType[] {
    throw new Error("Method 'findRules' not implemented.");
  }
}
