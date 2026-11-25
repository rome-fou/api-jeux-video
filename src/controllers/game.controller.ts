import type { NextFunction, Request, Response } from "express";

import type { CreateGameInput } from "../models/game.model.js";
import { gameService } from "../services/game.service.js";

export class GameController {
  findAll(_req: Request, res: Response, next: NextFunction): void {
    try {
      res.status(200).json(gameService.findAll());
    } catch (error) {
      next(error);
    }
  }

  findById(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = Number(req.params.id);
      res.status(200).json(gameService.findById(id));
    } catch (error) {
      next(error);
    }
  }

  create(req: Request, res: Response, next: NextFunction): void {
    try {
      const input = req.body as CreateGameInput;
      res.status(201).json(gameService.create(input));
    } catch (error) {
      next(error);
    }
  }

  update(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = Number(req.params.id);
      const input = req.body as CreateGameInput;
      res.status(200).json(gameService.update(id, input));
    } catch (error) {
      next(error);
    }
  }

  delete(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = Number(req.params.id);
      gameService.delete(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const gameController = new GameController();
