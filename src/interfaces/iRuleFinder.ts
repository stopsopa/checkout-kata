
export default interface IRuleFinder<RuleType, UniqueCriteria> {
  findRules(uniqueItems: UniqueCriteria[]): RuleType[];
}
