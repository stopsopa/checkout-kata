import { test } from "node:test";
import assert from "node:assert";
import add from "./add.ts";

/**
 * Simple test to check test setup
 */
test("sum function", () => {
  assert.strictEqual(add(1, 2), 3);
});
