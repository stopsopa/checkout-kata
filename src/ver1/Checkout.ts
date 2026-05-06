import type { ICheckout } from "../interfaces/iCheckout.ts";
import RuleFinder from "./RuleFinder.ts";
import Ver1Rule from "./Ver1Rule.ts";

export default class Checkout implements ICheckout<string, number> {
  protected items: string[] = [];
  /**
   * Types for IRuleFinder - are fixed on this level for this implementation of checkout
   * But generally IRuleFinder is universal for any shape of rule searching criteria
   * and for final structure of the rules
   *
   * but anyway the type and number of parameters requred by constructor are not envorced
   * on the ICheckout interface to give more flexibility to any other implementation of checkout
   */
  private ruleFinder: RuleFinder;
  constructor(ruleFinder: RuleFinder) {
    this.ruleFinder = ruleFinder;
  }

  scan(item: string): void {
    this.items.push(item);
  }

  async getTotalPrice(): Promise<number> {
    const uniqueItems = [...new Set(this.items)];

    const rules = this.ruleFinder.findRules(uniqueItems);

    return this.calculateTotalPrice(this.items, rules);
  }
  protected calculateTotalPrice(items: string[], rules: Ver1Rule[]): number {
    /**
     * counts repeating items in the basket - by type of item
     */
    const counts = items.reduce(
      (acc, sku) => {
        acc[sku] = (acc[sku] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    let total = 0;

    for (const sku in counts) {
      let count = counts[sku];

      // Sort rules for this SKU by countActivator descending
      const skuRules = rules.filter((r) => r.sku === sku).sort((a, b) => b.countActivator - a.countActivator);

      for (const rule of skuRules) {
        if (count >= rule.countActivator) {
          const times = Math.floor(count / rule.countActivator);
          total += times * rule.price;
          count -= times * rule.countActivator;
        }
      }
    }

    return total;
  }
}
