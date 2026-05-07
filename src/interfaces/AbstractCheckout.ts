import type { ICheckout } from "./iCheckout.ts";

export interface IBaseRule {
  sku: string;
  countActivator: number;
  price: number | string;
}

export default abstract class AbstractCheckout<ItemType, PriceType, RuleType>
  implements ICheckout<ItemType, PriceType>
{
  protected items: ItemType[] = [];

  protected abstract findRules(uniqueItems: ItemType[]): Promise<RuleType[]>;

  protected abstract getItemIdentity(item: ItemType): string;
  protected abstract getRuleIdentity(rule: RuleType): string;
  protected abstract getRuleCountActivator(rule: RuleType): number;
  protected abstract getRulePrice(rule: RuleType): PriceType;
  protected abstract getZeroPrice(): PriceType;
  protected abstract addPrices(a: PriceType, b: PriceType): PriceType;
  protected abstract multiplyPrice(price: PriceType, times: number): PriceType;

  scan(item: ItemType): void {
    this.items.push(item);
  }

  async getTotalPrice(): Promise<PriceType> {
    const uniqueItems: ItemType[] = [];
    const seen = new Set<string>();
    for (const item of this.items) {
      const id = this.getItemIdentity(item);
      if (!seen.has(id)) {
        uniqueItems.push(item);
        seen.add(id);
      }
    }

    const rules = await this.findRules(uniqueItems);

    return this.calculateTotalPrice(this.items, rules);
  }

  protected calculateTotalPrice(items: ItemType[], rules: RuleType[]): PriceType {
    const counts = new Map<string, number>();

    for (const item of items) {
      const id = this.getItemIdentity(item);
      counts.set(id, (counts.get(id) || 0) + 1);
    }

    let total = this.getZeroPrice();

    for (const [id, count] of counts.entries()) {
      let remainingCount = count;

      const skuRules = rules
        .filter((r) => this.getRuleIdentity(r) === id)
        .sort((a, b) => this.getRuleCountActivator(b) - this.getRuleCountActivator(a));

      for (const rule of skuRules) {
        const activator = this.getRuleCountActivator(rule);
        if (remainingCount >= activator) {
          const times = Math.floor(remainingCount / activator);
          const price = this.getRulePrice(rule);
          const bundlePrice = this.multiplyPrice(price, times);
          total = this.addPrices(total, bundlePrice);
          remainingCount -= times * activator;
        }
      }
    }

    return total;
  }
}
