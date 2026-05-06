import { test } from "node:test";
import assert from "node:assert";
import Checkout from "./Checkout.ts";
import RuleFinder from "./RuleFinder.ts";
import Ver1Rule from "./Ver1Rule.ts";

test("checkout - ver 1", async () => {
  // | SKU  | Unit Price | Special Price |
  // | ---- | ---------- | ------------- |
  // | A    | 50         | 3 for 130     |
  // | B    | 30         | 2 for 45      |
  // | C    | 20         |               |
  // | D    | 15         |               |

  const ruleFinder = new RuleFinder([
    new Ver1Rule("A", 50, 1),
    new Ver1Rule("A", 130, 3),

    new Ver1Rule("B", 30, 1),
    new Ver1Rule("B", 45, 2),

    new Ver1Rule("C", 20, 1),
    new Ver1Rule("D", 15, 1),
  ]);

  const checkout = new Checkout(ruleFinder);

  assert.strictEqual(add(1, 2), 3);
});
