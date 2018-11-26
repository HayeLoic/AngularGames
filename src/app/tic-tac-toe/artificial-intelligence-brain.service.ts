import { Injectable } from '@angular/core';
import { Square } from './square';
import { Player } from './player';
import { DifficultyLevel } from '../difficulty/difficulty-level';
import { Move } from './move';
import { isFulfilled } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ArtificialIntelligenceBrainService {

  constructor() { }

  chooseSquare(squares: Square[], enableSquares: Square[], difficultyLevel: DifficultyLevel, winningCombinations: Array<[number, number, number]>, currentPlayer: Player, players: Player[], historyGamesMoves: Move[][], currentGameMoves: Move[]): Square {
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
      case DifficultyLevel.VeryHard: {
        squareToPlay = this.getSquareToPlayInVeryHardDifficultyLevel(squares, enableSquares, winningCombinations, currentPlayer, players);
        break;
      }
      default: {
        squareToPlay = this.getSquareToPlayInMachineLearningDifficultyLevel(squares, enableSquares, currentPlayer, historyGamesMoves, currentGameMoves);
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
    squareIndexToPlay = this.getBestSquareIndexToPlay(squares, currentPlayer, winningCombinations);
    if (squareIndexToPlay != null) {
      return squares[squareIndexToPlay];
    }
    else {
      squareIndexToPlay = this.getRandomSquareIndex(enableSquares);
      return enableSquares[squareIndexToPlay];
    }
  }

  getSquareToPlayInMachineLearningDifficultyLevel(squares: Square[], enableSquares: Square[], currentPlayer: Player, historyGamesMoves: Move[][], currentGameMoves: Move[]): Square {
    let squareIndexToPlay: number = this.getMostProbableWinningSquareIndex(squares, currentPlayer, historyGamesMoves, currentGameMoves);
    if (squareIndexToPlay != null) {
      return squares[squareIndexToPlay];
    }
    else {
      squareIndexToPlay = this.getRandomSquareIndex(enableSquares);
      return enableSquares[squareIndexToPlay];
    }
  }

  getSimilarGames(historyGamesMoves: Move[][], currentGameMoves: Move[]): Move[][] {
    let similarGames: Move[][] = [];
    for (let historyGameMoves of historyGamesMoves) {
      let isSimilarGame: boolean = true;
      for (let currentGameMove of currentGameMoves) {
        let index: number = currentGameMoves.indexOf(currentGameMove);
        if (historyGameMoves[index] == null
          || currentGameMove.squareId != historyGameMoves[index].squareId
          || currentGameMove.symbol != historyGameMoves[index].symbol) {
          isSimilarGame = false;
        }
      }
      if (isSimilarGame) {
        similarGames.push(historyGameMoves);
      }
    }
    return similarGames;
  }

  getWinningMoveFromSimilarGames(similarGames: Move[][], currentGameMoves: Move[]): Move {
    let nextIndexToCheck: number = currentGameMoves.length;
    for (let similarGameMoves of similarGames) {
      if (similarGameMoves[nextIndexToCheck] != null && similarGameMoves[nextIndexToCheck].isWinningMove) {
        return similarGameMoves[nextIndexToCheck];
      }
    }
    return undefined;
  }

  getMostProbableWinningSquareIndex(squares: Square[], player: Player, historyGamesMoves: Move[][], currentGameMoves: Move[]): number {
    let mostProbableWinningSquareIndex: number;
    let similarGames: Move[][] = this.getSimilarGames(historyGamesMoves, currentGameMoves);
    let winningMoveFromSimilarGames = this.getWinningMoveFromSimilarGames(similarGames, currentGameMoves);
    if (winningMoveFromSimilarGames != null) {
      mostProbableWinningSquareIndex = winningMoveFromSimilarGames.squareId - 1;
    }

    return mostProbableWinningSquareIndex;
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

  getEnableAndIsolatedCornerSquareIndex(squares: Square[]): number {
    let enableAndIsolatedCornerSquareIndex: number;
    let isolatedCornerSquareIndex: number;
    for (let index = 0; index < squares.length; index++) {
      let square: Square = squares[index];
      if (this.isCornerSquare(square) && square.value != "") {
        let squareIndex: number = squares.indexOf(square);
        switch (squareIndex) {
          case 0:
            if (squares[1].value == "" && squares[2].value == "") {
              isolatedCornerSquareIndex = 2;
            }
            else {
              isolatedCornerSquareIndex = 6;
            }
            break;
          case 2:
            if (squares[0].value == "" && squares[1].value == "") {
              isolatedCornerSquareIndex = 0;
            }
            else {
              isolatedCornerSquareIndex = 8;
            }
            break;
          case 6:
            if (squares[7].value == "" && squares[8].value == "") {
              isolatedCornerSquareIndex = 8;
            }
            else {
              isolatedCornerSquareIndex = 0;
            }
            break;
          case 8:
            if (squares[6].value == "" && squares[7].value == "") {
              isolatedCornerSquareIndex = 6;
            }
            else {
              isolatedCornerSquareIndex = 2;
            }
            break;
        }
      }
    }
    if (squares[isolatedCornerSquareIndex].value == "") {
      enableAndIsolatedCornerSquareIndex = isolatedCornerSquareIndex;
    }
    return enableAndIsolatedCornerSquareIndex;
  }

  getWinningPossibilitiesCount(squares: Square[], player: Player, winningCombinations: Array<[number, number, number]>): number {
    let winningPossibilitiesCount: number = 0;
    for (let winningCombination of winningCombinations) {
      if (squares[winningCombination[0] - 1].value == player.symbol
        && squares[winningCombination[1] - 1].value == player.symbol
        && !squares[winningCombination[2] - 1].value) {
        winningPossibilitiesCount++;
      }
      if (squares[winningCombination[0] - 1].value == player.symbol
        && !squares[winningCombination[1] - 1].value
        && squares[winningCombination[2] - 1].value == player.symbol) {
        winningPossibilitiesCount++;
      }
      if (!squares[winningCombination[0] - 1].value
        && squares[winningCombination[1] - 1].value == player.symbol
        && squares[winningCombination[2] - 1].value == player.symbol) {
        winningPossibilitiesCount++;
      }
    }
    return winningPossibilitiesCount;
  }

  getEnableSquareIndexWithSeveralWinningPossibilities(readOnlySquares: Square[], currentPlayer: Player, winningCombinations: Array<[number, number, number]>): number {
    let enableSquareIndexWithTwoWinningPossibilities: number;
    for (let index = 0; index < readOnlySquares.length; index++) {
      let squares: Square[] = readOnlySquares.map(square => Object.assign({}, square));
      let square: Square = squares[index];
      if (square.value == "") {
        squares[index].value = currentPlayer.symbol;
        if (this.getWinningPossibilitiesCount(squares, currentPlayer, winningCombinations) > 1) {
          enableSquareIndexWithTwoWinningPossibilities = index;
        }
      }
    }
    return enableSquareIndexWithTwoWinningPossibilities;
  }

  getBestSquareIndexToPlay(squares: Square[], currentPlayer: Player, winningCombinations: Array<[number, number, number]>): number {
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
      else {
        return this.getEnableAndIsolatedCornerSquareIndex(squares);
      }
    }
    if (playedSquares.length === 3) {
      return this.getEnableEdgeSquareIndex(squares);
    }
    if (playedSquares.length === 4) {
      return this.getEnableSquareIndexWithSeveralWinningPossibilities(squares, currentPlayer, winningCombinations);
    }
    return bestSquareIndex;
  }
}
