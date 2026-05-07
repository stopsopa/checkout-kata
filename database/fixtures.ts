import { db, client, schema } from "./db.ts";

/**
 * /bin/bash ts.sh database/fixtures.ts
 */
try {
  console.log("Cleaning table 'rules'...");

  await db.execute(db.sql`TRUNCATE TABLE ${schema.rules} RESTART IDENTITY CASCADE`);

  console.log("Loading fixtures...");

  await db.insert(schema.rules).values([
    { sku: "A", price: "50.00", countActivator: 1 },
    { sku: "A", price: "130.00", countActivator: 3 },
    { sku: "B", price: "30.00", countActivator: 1 },
    { sku: "B", price: "45.00", countActivator: 2 },
    { sku: "C", price: "20.00", countActivator: 1 },
    { sku: "D", price: "15.00", countActivator: 1 },
  ]);

  console.log("Fixtures loaded successfully!");

  await client.end();
} catch (e) {
  console.error("Error loading fixtures:", e);
  process.exit(1);
}
