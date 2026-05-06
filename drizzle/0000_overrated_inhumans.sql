CREATE TABLE "rules" (
	"id" serial PRIMARY KEY NOT NULL,
	"sku" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"count_activator" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "rules_sku_count_activator_unique" UNIQUE("sku","count_activator")
);
