import type IRuleFinder from "./iRuleFinder.ts";

export interface ICheckout<ItemType> {
  scan(item: ItemType): void;
  getTotalPrice(): number;
}
