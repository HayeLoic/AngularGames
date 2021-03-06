import { Injectable } from '@angular/core';
import { PuzzlePortion } from './puzzle-portion';

@Injectable({
  providedIn: 'root'
})
export class PuzzlePortionService {

  constructor() { }

  getPuzzlePortions(imageWith: number, imageHeight: number, portionCountX: number, portionCountY: number): PuzzlePortion[] {
    let puzzlePortions: PuzzlePortion[] = [];
    let puzzlePortionIndex: number = 0;
    let puzzlePortionWith = Math.round(imageWith / portionCountX);
    let puzzlePortionHeight = Math.round(imageHeight / portionCountY);
    for (let indexX = 0; indexX < portionCountX; indexX++) {
      for (let indexY = 0; indexY < portionCountY; indexY++) {
        puzzlePortions.push(new PuzzlePortion(puzzlePortionIndex, indexX * puzzlePortionWith, indexY * puzzlePortionHeight));
        puzzlePortionIndex++;
      }
    }
    return puzzlePortions;
  }

  shuffle(puzzlePortions: PuzzlePortion[]): PuzzlePortion[] {
    for (let index = puzzlePortions.length - 1; index > 0; index--) {
      const randomNumber: number = Math.floor(Math.random() * (index + 1));
      [puzzlePortions[index], puzzlePortions[randomNumber]] = [puzzlePortions[randomNumber], puzzlePortions[index]];
    }
    return puzzlePortions;
  }
}
