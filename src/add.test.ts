import { test } from "node:test";
import assert from "node:assert";
import add from "./add.ts";

test("sum function", () => {
  assert.strictEqual(add(1, 2), 3);
});
