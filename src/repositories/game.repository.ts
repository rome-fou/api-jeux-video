import { db } from "../database/database.js";
import type { CreateGameInput, Game } from "../models/game.model.js";

interface GameRow {
  id: number;
  title: string;
  editor: string;
  release_year: number;
  genre: string;
  rating: number;
}

function mapRow(row: GameRow): Game {
  return {
    id: row.id,
    title: row.title,
    editor: row.editor,
    releaseYear: row.release_year,
    genre: row.genre,
    rating: row.rating,
  };
}

export class GameRepository {
  findAll(): Game[] {
    const rows = db.prepare("SELECT * FROM games").all() as GameRow[];
    return rows.map(mapRow);
  }

  findById(id: number): Game | undefined {
    const row = db.prepare("SELECT * FROM games WHERE id = ?").get(id) as
      | GameRow
      | undefined;
    return row ? mapRow(row) : undefined;
  }

  create(game: CreateGameInput): Game {
    const result = db
      .prepare(
        "INSERT INTO games (title, editor, release_year, genre, rating) VALUES (@title, @editor, @releaseYear, @genre, @rating)",
      )
      .run(game);

    return this.findById(Number(result.lastInsertRowid)) as Game;
  }

  update(id: number, game: CreateGameInput): Game | undefined {
    db.prepare(
      "UPDATE games SET title = @title, editor = @editor, release_year = @releaseYear, genre = @genre, rating = @rating WHERE id = @id",
    ).run({ ...game, id });

    return this.findById(id);
  }

  delete(id: number): boolean {
    const result = db.prepare("DELETE FROM games WHERE id = ?").run(id);
    return result.changes > 0;
  }

  getAll(): Game[] {
    return this.findAll();
  }

  getById(id: number): Game | undefined {
    return this.findById(id);
  }

  add(game: CreateGameInput): Game {
    return this.create(game);
  }

  remove(id: number): boolean {
    return this.delete(id);
  }
}

export const gameRepository = new GameRepository();
