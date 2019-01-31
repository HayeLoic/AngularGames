import { Injectable } from '@angular/core';
import { PuzzleModel } from './puzzle-model';

@Injectable({
  providedIn: 'root'
})
export class PuzzleModelService {

  constructor() { }

  getDefaultPuzzleModel(): PuzzleModel {
    return new PuzzleModel(0, 'Puzzle de chien', 'assets/img/dessin-de-chien.jpg', 439, 285, 3, 2);
  }

  getPortionWith(puzzleModel: PuzzleModel): number {
    return Math.round(puzzleModel.width / puzzleModel.portionCountX);
  }

  getPortionHeight(puzzleModel: PuzzleModel): number {
    return Math.round(puzzleModel.height / puzzleModel.portionCountY);
  }
}
