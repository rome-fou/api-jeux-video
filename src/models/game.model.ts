export interface CreateGameInput {
  title: string;
  editor: string;
  releaseYear: number;
  genre: string;
  rating: number;
}

export class Game {
  id: number;
  title: string;
  editor: string;
  releaseYear: number;
  genre: string;
  rating: number;

  constructor(game: { id: number } & CreateGameInput) {
    this.id = game.id;
    this.title = game.title;
    this.editor = game.editor;
    this.releaseYear = game.releaseYear;
    this.genre = game.genre;
    this.rating = game.rating;
  }
}
