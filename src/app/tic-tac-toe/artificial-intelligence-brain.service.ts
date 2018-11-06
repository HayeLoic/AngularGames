import { Injectable } from '@angular/core';
import { Square } from './square';
import { Player } from './player';
import { DifficultyLevel } from '../difficulty/difficulty-level';

@Injectable({
  providedIn: 'root'
})
export class ArtificialIntelligenceBrainService {

  constructor() { }

  chooseSquare(squares: Square[], enableSquares: Square[], difficultyLevel: DifficultyLevel, winningCombinations: Array<[number, number, number]>, currentPlayer: Player): Square {
    let squareIndexToPlay: number;
    if (difficultyLevel == DifficultyLevel.Easy) {
      squareIndexToPlay = this.getRandomSquareIndex(enableSquares);
      return enableSquares[squareIndexToPlay];
    }
    else {
      squareIndexToPlay = this.getWinningSquareIndex(squares, winningCombinations, currentPlayer);
      if (squareIndexToPlay) {
        return squares[squareIndexToPlay];
      }
      else {
        squareIndexToPlay = this.getRandomSquareIndex(enableSquares);
        return enableSquares[squareIndexToPlay];
      }
    }
  }

  getRandomSquareIndex(squares: Square[]): number {
    let max: number = squares.length;
    return Math.floor(Math.random() * max);
  }

  getWinningSquareIndex(squares: Square[], winningCombinations: Array<[number, number, number]>, player: Player): number {
    for (let winningCombination of winningCombinations) {
      if (squares[winningCombination[0] - 1].value == player.symbol
        && squares[winningCombination[1] - 1].value == player.symbol
        && !squares[winningCombination[2] - 1].value) {
        return winningCombination[2] - 1;
      }
      if (squares[winningCombination[0] - 1].value == player.symbol
        && !squares[winningCombination[1] - 1].value
        && squares[winningCombination[2] - 1].value == player.symbol) {
        return winningCombination[1] - 1;
      }
      if (!squares[winningCombination[0] - 1].value
        && squares[winningCombination[1] - 1].value == player.symbol
        && squares[winningCombination[2] - 1].value == player.symbol) {
        return winningCombination[0] - 1;
      }
    }
  }
}
