import { Router } from "express";

import { gameController } from "../controllers/game.controller.js";

export const gameRoutes = Router();

gameRoutes.get("/", gameController.findAll.bind(gameController));
gameRoutes.get("/:id", gameController.findById.bind(gameController));
gameRoutes.post("/", gameController.create.bind(gameController));
gameRoutes.put("/:id", gameController.update.bind(gameController));
gameRoutes.delete("/:id", gameController.delete.bind(gameController));
