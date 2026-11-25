import Database from "better-sqlite3";

import { databaseDir } from "../config/paths.js";
import path from "node:path";

export const database = new Database(path.join(databaseDir, "game.db"));
