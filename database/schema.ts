import { pgTable, serial, text, integer, timestamp, unique, numeric } from "drizzle-orm/pg-core";

export const rules = pgTable(
  "rules",
  {
    id: serial("id").primaryKey(),
    sku: text("sku").notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    countActivator: integer("count_activator").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [unique().on(t.sku, t.countActivator)],
);
