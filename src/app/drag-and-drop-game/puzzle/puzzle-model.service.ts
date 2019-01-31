import { Injectable } from '@angular/core';
import { PuzzleModel } from './puzzle-model';
import { Difficulty } from 'src/app/difficulty/difficulty';
import { DifficultyLevel } from 'src/app/difficulty/difficulty-level';

@Injectable({
  providedIn: 'root'
})
export class PuzzleModelService {

  constructor() { }

  getDefaultPuzzleModel(difficulty: Difficulty): PuzzleModel {
    let difficultyCoefficient: number;
    switch (difficulty.difficultyLevel) {
      case DifficultyLevel.Easy:
        difficultyCoefficient = 1;
        break;
      case DifficultyLevel.Medium:
        difficultyCoefficient = 2;
        break;
      default:
        difficultyCoefficient = 3;
        break;
    }
    return new PuzzleModel(0, 'Puzzle de chien', 'assets/img/dessin-de-chien.jpg', 439, 285, 3 * difficultyCoefficient, 2 * difficultyCoefficient);
  }

  getPortionWith(puzzleModel: PuzzleModel): number {
    return Math.round(puzzleModel.width / puzzleModel.portionCountX);
  }

  getPortionHeight(puzzleModel: PuzzleModel): number {
    return Math.round(puzzleModel.height / puzzleModel.portionCountY);
  }
}
