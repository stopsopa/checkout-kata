import AbstractCheckout from "../interfaces/AbstractCheckout.ts";

import Ver1Rule from "./Ver1Rule.ts";

/**
 * I've introduced separate Checkout classes for in memory and in database
 * implementations to introduce point in code where we can create new Checkout
 * implementations by just injecting different types but if internally these should be
 * handled differently then this is the level where we can override methods from AbstractCheckout
 */
export default class Checkout extends AbstractCheckout<string, number, Ver1Rule> {}
