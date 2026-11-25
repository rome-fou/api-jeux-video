import fs from "node:fs";
import path from "node:path";

import express from "express";
import type { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";

import { projectRoot } from "./config/paths.js";
import { gameRoutes } from "./routes/game.routes.js";
import { HttpError } from "./services/game.service.js";

export const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "API Jeux Vidéo opérationnelle" });
});

const swaggerPath = path.join(projectRoot, "docs", "openapi.yaml");
const swaggerText = fs.readFileSync(swaggerPath, "utf8");
const swaggerDocument = YAML.parse(swaggerText);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/games", gameRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "Route introuvable" });
});

interface RequestError extends Error {
  type?: string;
  status?: number;
  details?: unknown;
}

function handleError(
  err: RequestError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof HttpError) {
    const status = err.status ?? 500;
    res.status(status).json({ error: err.message, details: err.details });
    return;
  }

  if (err.type === "entity.parse.failed") {
    res.status(400).json({ error: "JSON invalide" });
    return;
  }

  if (err.status !== undefined && err.status >= 400 && err.status < 500) {
    const message = err.status === 413
      ? "Corps de requête trop volumineux"
      : "Requête invalide";
    res.status(err.status).json({ error: message });
    return;
  }

  console.error(err);
  res.status(500).json({ error: "Erreur interne du serveur" });
}

app.use(handleError);