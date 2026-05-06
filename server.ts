import path from "path";

import express from "express";

import type { Application } from "express";

import serveIndex from "serve-index";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const web = path.resolve(__dirname, ".");

const { HOST: host, PORT: portRaw } = process.env;

if (!host || !portRaw) {
  throw new Error("HOST and PORT environment variables are required");
}

const port = parseInt(portRaw, 10);

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

app.listen(port, host, () => {
  console.log(`\n 🌎  Server is running ` + `http://${host}:${port}\n`);
});
