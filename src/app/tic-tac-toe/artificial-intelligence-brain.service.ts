import { Injectable } from '@angular/core';
import { Square } from './square';
import { Player } from './player';
import { DifficultyLevel } from './difficulty-level';

@Injectable({
  providedIn: 'root'
})
export class ArtificialIntelligenceBrainService {

  constructor() { }

  chooseSquare(squares: Square[], enableSquares: Square[], difficultyLevel: DifficultyLevel, winningCombinations: Array<[number, number, number]>, currentPlayer: Player): Square {
    let squareIdToPlay: number;
    if (difficultyLevel == DifficultyLevel.Easy) {
      squareIdToPlay = this.getRandomSquareId(enableSquares);
      return enableSquares[squareIdToPlay];
    }
    else {
      squareIdToPlay = this.getWinningSquareId(squares, winningCombinations, currentPlayer);
      if (squareIdToPlay) {
        return squares[squareIdToPlay];
      }
      else {
        squareIdToPlay = this.getRandomSquareId(enableSquares);
        return enableSquares[squareIdToPlay];
      }
    }
  }

  getRandomSquareId(squares: Square[]): number {
    let max: number = squares.length;
    return Math.floor(Math.random() * max);
  }

  getWinningSquareId(squares: Square[], winningCombinations: Array<[number, number, number]>, player: Player): number {
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
      if (squares[winningCombination[0] - 1].value == player.symbol
        && squares[winningCombination[1] - 1].value == player.symbol
        && !squares[winningCombination[2] - 1].value) {
        return winningCombination[0] - 1;
      }
    }
  }
}
