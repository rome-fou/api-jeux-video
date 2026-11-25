import type { CreateGameInput, Game } from "../models/game.model.js";
import { gameRepository } from "../repositories/game.repository.js";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown,
  ) {
    super(message);
  }
}

function validateId(id: number): void {
  if (!Number.isInteger(id) || id <= 0) {
    throw new HttpError(400, "Identifiant invalide");
  }
}

function validateGameInput(input: CreateGameInput): void {
  const errors: string[] = [];

  if (typeof input.title !== "string" || input.title.trim() === "") {
    errors.push("title est obligatoire");
  }
  if (typeof input.editor !== "string" || input.editor.trim() === "") {
    errors.push("editor est obligatoire");
  }
  if (!Number.isInteger(input.releaseYear)) {
    errors.push("releaseYear doit être un entier");
  }
  if (typeof input.genre !== "string" || input.genre.trim() === "") {
    errors.push("genre est obligatoire");
  }
  if (
    typeof input.rating !== "number" ||
    !Number.isFinite(input.rating) ||
    input.rating < 0 ||
    input.rating > 10
  ) {
    errors.push("rating doit être compris entre 0 et 10");
  }

  if (errors.length > 0) {
    throw new HttpError(400, "Données invalides", errors);
  }
}

export class GameService {
  findAll(): Game[] {
    return gameRepository.findAll();
  }

  findById(id: number): Game {
    validateId(id);
    const game = gameRepository.findById(id);
    if (!game) {
      throw new HttpError(404, "Jeu introuvable");
    }
    return game;
  }

  create(input: CreateGameInput): Game {
    validateGameInput(input);
    return gameRepository.create(input);
  }

  update(id: number, input: CreateGameInput): Game {
    validateId(id);
    validateGameInput(input);

    const game = gameRepository.update(id, input);
    if (!game) {
      throw new HttpError(404, "Jeu introuvable");
    }
    return game;
  }

  delete(id: number): void {
    validateId(id);
    if (!gameRepository.delete(id)) {
      throw new HttpError(404, "Jeu introuvable");
    }
  }
}

export const gameService = new GameService();
