import type IRuleFinder from "./iRuleFinder.ts";

export interface ICheckout<ItemType, PriceType> {
  scan(item: ItemType): void;
  getTotalPrice(): Promise<PriceType>;
}
