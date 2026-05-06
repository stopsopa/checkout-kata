
export default interface IRuleFinder<RuleType, UniqueCriteria> {
  /**
   * Find any special rules for discounts for any unique items type
   * We have added to the basket
   * 
   * In other words:
   * We have to extract list of unique items and find if there are any 
   * special discount rules for any of these items.
   */
  findRules(uniqueItems: UniqueCriteria[]): RuleType[];
}
