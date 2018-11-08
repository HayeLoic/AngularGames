import { Injectable } from '@angular/core';
import { Square } from './square';
import { Player } from './player';
import { DifficultyLevel } from '../difficulty/difficulty-level';

@Injectable({
  providedIn: 'root'
})
export class ArtificialIntelligenceBrainService {

  constructor() { }

  chooseSquare(squares: Square[], enableSquares: Square[], difficultyLevel: DifficultyLevel, winningCombinations: Array<[number, number, number]>, currentPlayer: Player, players: Player[]): Square {
    let squareToPlay: Square;
    switch (difficultyLevel) {
      case DifficultyLevel.Easy: {
        squareToPlay = this.getSquareToPlayInEasyDifficultyLevel(enableSquares);
        break;
      }
      case DifficultyLevel.Medium: {
        squareToPlay = this.getSquareToPlayInMediumDifficultyLevel(squares, enableSquares, winningCombinations, currentPlayer);
        break;
      }
      case DifficultyLevel.Hard: {
        squareToPlay = this.getSquareToPlayInHardDifficultyLevel(squares, enableSquares, winningCombinations, currentPlayer, players);
        break;
      }
      default: {
        squareToPlay = this.getSquareToPlayInVeryHardDifficultyLevel(squares, enableSquares, winningCombinations, currentPlayer, players);
        break;
      }
    }
    return squareToPlay;
  }

  getSquareToPlayInEasyDifficultyLevel(enableSquares: Square[]): Square {
    let squareIndexToPlay: number = this.getRandomSquareIndex(enableSquares);
    return enableSquares[squareIndexToPlay];
  }

  getSquareToPlayInMediumDifficultyLevel(squares: Square[], enableSquares: Square[], winningCombinations: Array<[number, number, number]>, currentPlayer: Player): Square {
    let squareIndexToPlay: number = this.getWinningSquareIndex(squares, winningCombinations, currentPlayer);
    if (squareIndexToPlay != null) {
      return squares[squareIndexToPlay];
    }
    else {
      squareIndexToPlay = this.getRandomSquareIndex(enableSquares);
      return enableSquares[squareIndexToPlay];
    }
  }

  getSquareToPlayInHardDifficultyLevel(squares: Square[], enableSquares: Square[], winningCombinations: Array<[number, number, number]>, currentPlayer: Player, players: Player[]): Square {
    let squareIndexToPlay: number = this.getWinningSquareIndex(squares, winningCombinations, currentPlayer);
    if (squareIndexToPlay != null) {
      return squares[squareIndexToPlay];
    }
    squareIndexToPlay = this.getOpponentWinningSquareIndex(squares, winningCombinations, currentPlayer, players);
    if (squareIndexToPlay != null) {
      return squares[squareIndexToPlay];
    }
    else {
      squareIndexToPlay = this.getRandomSquareIndex(enableSquares);
      return enableSquares[squareIndexToPlay];
    }
  }

  getSquareToPlayInVeryHardDifficultyLevel(squares: Square[], enableSquares: Square[], winningCombinations: Array<[number, number, number]>, currentPlayer: Player, players: Player[]): Square {
    let squareIndexToPlay: number = this.getWinningSquareIndex(squares, winningCombinations, currentPlayer);
    if (squareIndexToPlay != null) {
      return squares[squareIndexToPlay];
    }
    squareIndexToPlay = this.getOpponentWinningSquareIndex(squares, winningCombinations, currentPlayer, players);
    if (squareIndexToPlay != null) {
      return squares[squareIndexToPlay];
    }
    squareIndexToPlay = this.getBestSquareIndexToPlay(squares, currentPlayer);
    if (squareIndexToPlay != null) {
      return squares[squareIndexToPlay];
    }
    else {
      squareIndexToPlay = this.getRandomSquareIndex(enableSquares);
      return enableSquares[squareIndexToPlay];
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

  getOpponentWinningSquareIndex(squares: Square[], winningCombinations: Array<[number, number, number]>, currentPlayer: Player, players: Player[]): number {
    let opponentWinningSquareIndex: number;
    players.forEach((player) => {
      if (opponentWinningSquareIndex == null && player != currentPlayer) {
        opponentWinningSquareIndex = this.getWinningSquareIndex(squares, winningCombinations, player);
      }
      if (opponentWinningSquareIndex != null) {
        return opponentWinningSquareIndex;
      }
    });
    return opponentWinningSquareIndex;
  }

  isCornerSquare(square: Square): boolean {
    let cornerSquareIds: number[] = [1, 3, 7, 9];
    return cornerSquareIds.includes(square.id);
  }

  isEdgeSquare(square: Square): boolean {
    let edgeSquareIds: number[] = [2, 4, 6, 8];
    return edgeSquareIds.includes(square.id);
  }

  getCenterSquareIndex(): number {
    return 4;
  }

  getEnableCornerSquareIndex(squares: Square[]): number {
    let enableCornerSquareIndex: number;
    let enableSquares: Square[] = squares.filter(square => !square.value);
    enableSquares.forEach((enableSquare) => {
      if (this.isCornerSquare(enableSquare)) {
        enableCornerSquareIndex = squares.indexOf(enableSquare);
      }
    });
    return enableCornerSquareIndex;
  }

  getEnableEdgeSquareIndex(squares: Square[]): number {
    let enableEdgeSquareIndex: number;
    let enableSquares: Square[] = squares.filter(square => !square.value);
    enableSquares.forEach((enableSquare) => {
      if (this.isEdgeSquare(enableSquare)) {
        enableEdgeSquareIndex = squares.indexOf(enableSquare);
      }
    });
    return enableEdgeSquareIndex;
  }

  hasOpponentPlayedCenterSquare(squares: Square[], currentPlayer: Player): boolean {
    let centerSquare: Square = squares[this.getCenterSquareIndex()];
    return centerSquare.value != "" && centerSquare.value != currentPlayer.symbol;
  }

  getOppositeSquareIndex(squares, squareIndex) {
    return squares.length - squareIndex - 1;
  }

  getEnableCornerSquareIndexOppositeToThePreviousPlayedCornerSquare(squares: Square[]): number {
    let previousSquareIndex: number;
    let oppositeSquareIndex: number;
    let nextSquareIndex: number;
    for (let index = 0; index < squares.length; index++) {
      let square: Square = squares[index];
      if (square.value != "" && this.isCornerSquare(square)) {
        previousSquareIndex = index;
      }
    }
    oppositeSquareIndex = this.getOppositeSquareIndex(squares, previousSquareIndex);
    if (squares[oppositeSquareIndex].value == "") {
      nextSquareIndex = oppositeSquareIndex;
    }
    return nextSquareIndex;
  }

  getBestSquareIndexToPlay(squares: Square[], currentPlayer: Player): number {
    let bestSquareIndex: number;
    let playedSquares: Square[] = squares.filter(square => square.value != "");
    if (playedSquares.length === 0) {
      return this.getEnableCornerSquareIndex(squares);
    }
    if (playedSquares.length === 1) {
      if (this.isCornerSquare(playedSquares[0]) || this.isEdgeSquare(playedSquares[0])) {
        return this.getCenterSquareIndex();
      }
    }
    if (playedSquares.length === 2) {
      if (this.hasOpponentPlayedCenterSquare(squares, currentPlayer)) {
        return this.getEnableCornerSquareIndexOppositeToThePreviousPlayedCornerSquare(squares);
      }
    }
    if (playedSquares.length === 3) {
      return this.getEnableEdgeSquareIndex(squares);
    }
    return bestSquareIndex;
  }
}
