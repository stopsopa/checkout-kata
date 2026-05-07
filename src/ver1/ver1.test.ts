import { test } from "node:test";
import assert from "node:assert";
import Checkout from "./Checkout.ts";
import Ver1Rule from "./Ver1Rule.ts";

/**
 *
 * /bin/bash ts.sh --test src/ver1/ver1.test.ts
 */
function checkoutFactory(): Checkout {
  // | SKU  | Unit Price | Special Price |
  // | ---- | ---------- | ------------- |
  // | A    | 50         | 3 for 130     |
  // | B    | 30         | 2 for 45      |
  // | C    | 20         |               |
  // | D    | 15         |               |

  const rules = [
    new Ver1Rule("A", 50, 1),
    new Ver1Rule("A", 130, 3),

    new Ver1Rule("B", 30, 1),
    new Ver1Rule("B", 45, 2),

    new Ver1Rule("C", 20, 1),
    new Ver1Rule("D", 15, 1),
  ];

  return new Checkout(rules);
}

test('price("") should be 0', async () => {
  const checkout = checkoutFactory();
  assert.strictEqual(await checkout.getTotalPrice(), 0);
});

test("incremental test", async () => {
  const co = checkoutFactory();

  assert.strictEqual(await co.getTotalPrice(), 0);

  co.scan("A");
  assert.strictEqual(await co.getTotalPrice(), 50);

  co.scan("B");
  assert.strictEqual(await co.getTotalPrice(), 80);

  co.scan("A");
  assert.strictEqual(await co.getTotalPrice(), 130);

  co.scan("A");
  assert.strictEqual(await co.getTotalPrice(), 160);

  co.scan("B");
  assert.strictEqual(await co.getTotalPrice(), 175);
});

test('price("A") should be 50', async () => {
  const checkout = checkoutFactory();
  checkout.scan("A");
  assert.strictEqual(await checkout.getTotalPrice(), 50);
});

test('price("AB") should be 80', async () => {
  const checkout = checkoutFactory();
  checkout.scan("A");
  checkout.scan("B");
  assert.strictEqual(await checkout.getTotalPrice(), 80);
});

test('price("CDBA") should be 115', async () => {
  const checkout = checkoutFactory();
  checkout.scan("C");
  checkout.scan("D");
  checkout.scan("B");
  checkout.scan("A");
  assert.strictEqual(await checkout.getTotalPrice(), 115);
});

test('price("AA") should be 100', async () => {
  const checkout = checkoutFactory();
  checkout.scan("A");
  checkout.scan("A");
  assert.strictEqual(await checkout.getTotalPrice(), 100);
});

test('price("AAA") should be 130', async () => {
  const checkout = checkoutFactory();
  checkout.scan("A");
  checkout.scan("A");
  checkout.scan("A");
  assert.strictEqual(await checkout.getTotalPrice(), 130);
});

test('price("AAAA") should be 180', async () => {
  const checkout = checkoutFactory();
  checkout.scan("A");
  checkout.scan("A");
  checkout.scan("A");
  checkout.scan("A");
  assert.strictEqual(await checkout.getTotalPrice(), 180);
});

test('price("AAAAA") should be 230', async () => {
  const checkout = checkoutFactory();
  checkout.scan("A");
  checkout.scan("A");
  checkout.scan("A");
  checkout.scan("A");
  checkout.scan("A");
  assert.strictEqual(await checkout.getTotalPrice(), 230);
});

test('price("AAAAAA") should be 260', async () => {
  const checkout = checkoutFactory();
  checkout.scan("A");
  checkout.scan("A");
  checkout.scan("A");
  checkout.scan("A");
  checkout.scan("A");
  checkout.scan("A");
  assert.strictEqual(await checkout.getTotalPrice(), 260);
});

test('price("AAAB") should be 160', async () => {
  const checkout = checkoutFactory();
  checkout.scan("A");
  checkout.scan("A");
  checkout.scan("A");
  checkout.scan("B");
  assert.strictEqual(await checkout.getTotalPrice(), 160);
});

test('price("AAABB") should be 175', async () => {
  const checkout = checkoutFactory();
  checkout.scan("A");
  checkout.scan("A");
  checkout.scan("A");
  checkout.scan("B");
  checkout.scan("B");
  assert.strictEqual(await checkout.getTotalPrice(), 175);
});

test('price("AAABBD") should be 190', async () => {
  const checkout = checkoutFactory();
  checkout.scan("A");
  checkout.scan("A");
  checkout.scan("A");
  checkout.scan("B");
  checkout.scan("B");
  checkout.scan("D");
  assert.strictEqual(await checkout.getTotalPrice(), 190);
});

test('price("DABABA") should be 190', async () => {
  const checkout = checkoutFactory();
  checkout.scan("D");
  checkout.scan("A");
  checkout.scan("B");
  checkout.scan("A");
  checkout.scan("B");
  checkout.scan("A");
  assert.strictEqual(await checkout.getTotalPrice(), 190);
});

test("Ver1Rule should throw if price or countActivator is not positive", () => {
  assert.throws(() => new Ver1Rule("A", 0, 1), /Price and countActivator must be positive/);
  assert.throws(() => new Ver1Rule("A", 1, 0), /Price and countActivator must be positive/);
  assert.throws(() => new Ver1Rule("A", -1, 1), /Price and countActivator must be positive/);
  assert.throws(() => new Ver1Rule("A", 1, -1), /Price and countActivator must be positive/);
  assert.throws(() => new Ver1Rule("A", 0, 0), /Price and countActivator must be positive/);
});
