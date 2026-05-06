import { z } from "zod";

const configSchema = z.object({
  DATABASE_URL: z.url().optional(),
  PG_USER: z.string().min(1),
  PG_PASS: z.string().min(1),
  PG_HOST: z.string().min(1),
  PG_PORT: z.coerce.number().int().positive(),
  PG_DB: z.string().min(1),
});

type Config = z.infer<typeof configSchema>;

let env: Config;

try {
  env = configSchema.parse(process.env);
} catch (e) {
  throw new Error(`env.ts error: ${e}`);
}

export default env;
