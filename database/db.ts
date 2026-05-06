import { drizzle } from "drizzle-orm/postgres-js";

import { sql } from "drizzle-orm";

import postgres from "postgres";

import * as schema from "./schema.ts";

import env from "../env.ts";

export const client = postgres(env.DATABASE_URL, { max: 1 });

export const db = Object.assign(drizzle(client, { schema }), { sql });

export * as schema from "./schema.ts";
