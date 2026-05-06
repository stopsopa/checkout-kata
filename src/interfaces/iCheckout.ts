import type IRuleFinder from "./iRuleFinder.ts";

export interface ICheckout<ItemType> {
  scan(item: ItemType): void;
  getTotalPrice(): number;
}

export interface ICheckoutConstructor<RuleType, ItemType> {
  new (ruleFinder: IRuleFinder<RuleType, ItemType>): ICheckout<ItemType>;
}
