import { sql } from "drizzle-orm";
import { db, client } from "../database/db.ts";

const log = (...args: any[]) => {
  console.log(`.github/db-healthy.ts: `, ...args);
};

/**
 * /bin/bash ts.sh .github/db-healthy.ts 10
 */

const maxRetries = parseInt(process.argv[2] || "10", 10);

for (let i = 1; i <= maxRetries; i++) {
  try {
    log(`Attempt ${i}/${maxRetries}: Connecting to database...`);

    // Simple query to verify connection
    await db.execute(sql`SELECT 1`);

    log("Successfully connected to database!");

    await client.end();

    process.exit(0);
  } catch (error) {
    log(`Attempt ${i}/${maxRetries} failed: ${error instanceof Error ? error.message : String(error)}`);

    if (i < maxRetries) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

log("Could not establish database connection within the timeout period.");

process.exit(1);
