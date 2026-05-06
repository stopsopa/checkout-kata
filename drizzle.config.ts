import { defineConfig } from "drizzle-kit";

import env from "./env";

const { DATABASE_URL } = env;

const url = new URL(DATABASE_URL);

// Suppress PostgreSQL NOTICE messages (e.g., "schema already exists, skipping")
url.searchParams.set("options", "-c client_min_messages=warning");

export default defineConfig({
  out: "./drizzle",
  schema: "./database/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: url.toString(),
  },
});
