import { test, after } from "node:test";
import assert from "node:assert";
import Checkout from "./Checkout.ts";

import { client } from "../../database/db.ts";

/**
 * /bin/bash ts.sh --test src/ver2/ver2.test.ts
 */
function checkoutFactory(): Checkout {
  // | SKU  | Unit Price | Special Price |
  // | ---- | ---------- | ------------- |
  // | A    | 50         | 3 for 130     |
  // | B    | 30         | 2 for 45      |
  // | C    | 20         |               |
  // | D    | 15         |               |
  // WARNING: but this time defined in database: database/fixtures.ts

  return new Checkout();
}

after(async () => {
  await client.end();
});

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
