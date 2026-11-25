import Database from "better-sqlite3";
import path from "node:path";

import { projectRoot } from "../config/paths.js";

export const db = new Database(
  path.join(projectRoot, "src", "database", "game.db"),
);

export const database = db;
