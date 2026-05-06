import path from "path";

import express from "express";

import type { Application } from "express";

import serveIndex from "serve-index";

import { fileURLToPath } from "url";

import env from "./env.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const web = path.resolve(__dirname, ".");

const app: Application = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(
  express.static(web, {
    index: false,
    maxAge: "356 days",
  }),
);

app.use(
  serveIndex(web, {
    icons: true,
    view: "details",
    hidden: false,
  }) as any,
);

app.listen(env.PORT, env.HOST, () => {
  console.log(`\n 🌎  Server is running ` + `http://${env.HOST}:${env.PORT}\n`);
});
