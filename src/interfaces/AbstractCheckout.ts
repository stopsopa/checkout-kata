import type { ICheckout } from "./iCheckout.ts";
import type IRuleFinder from "./iRuleFinder.ts";

export interface IBaseRule {
  sku: string;
  countActivator: number;
  price: number | string;
}

export default abstract class AbstractCheckout<
  ItemType extends string,
  PriceType extends number,
  RuleType extends IBaseRule,
> implements ICheckout<ItemType, PriceType> {
  protected items: ItemType[] = [];

  protected ruleFinder: IRuleFinder<RuleType, ItemType>;

  constructor(ruleFinder: IRuleFinder<RuleType, ItemType>) {
    this.ruleFinder = ruleFinder;
  }

  scan(item: ItemType): void {
    this.items.push(item);
  }

  async getTotalPrice(): Promise<PriceType> {
    const uniqueItems = [...new Set(this.items)];

    const rules = await this.ruleFinder.findRules(uniqueItems);

    return this.calculateTotalPrice(this.items, rules) as PriceType;
  }

  protected calculateTotalPrice(items: ItemType[], rules: RuleType[]): number {
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
          total += times * Number(rule.price);
          count -= times * rule.countActivator;
        }
      }
    }

    return total;
  }
}
