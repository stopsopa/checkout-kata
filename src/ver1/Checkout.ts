import type { ICheckout } from "../interfaces/iCheckout.ts";
import type IRuleFinder from "../interfaces/iRuleFinder.ts";
import Ver1Rule from "./Ver1Rule.ts";

export default class Checkout implements ICheckout<string, number> {
  /**
   * Types for IRuleFinder - are fixed on this level for this implementation of checkout
   * But generally IRuleFinder is universal for any shape of rule searching criteria
   * and for final structure of the rules
   *
   * but anyway the type and number of parameters requred by constructor are not envorced
   * on the ICheckout interface to give more flexibility to any other implementation of checkout
   */
  constructor(private ruleFinder: IRuleFinder<Ver1Rule, string>) {}

  scan(item: string): void {
    throw new Error("Method 'scan' not implemented.");
  }

  async getTotalPrice(): Promise<number> {
    throw new Error("Method 'getTotalPrice' not implemented.");
  }
}
