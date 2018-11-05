import { Component, OnInit } from '@angular/core';
import { Square } from './square';
import { Player } from './player';
import { DifficultyLevel } from '../difficulty/difficulty-level';
import { ArtificialIntelligenceBrainService } from './artificial-intelligence-brain.service';
import { Difficulty } from '../difficulty/difficulty';
import { DifficultyService } from '../difficulty/difficulty.service';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
  squares: Square[] = [];
  players: Player[] = [];
  maxSquareCount: number = 9;
  currentPlayer: Player;
  winner: Player;
  isDrawMatch: boolean;
  winningCombinations: Array<[number, number, number]> = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
  tryToMoveIntervalInMilliseconds: number = 2000;
  difficulties: Difficulty[] = [];
  selectedDifficulty: Difficulty;
  selectedDifficultyId: number;

  constructor(private artificialIntelligenceBrainService: ArtificialIntelligenceBrainService, private difficultyService: DifficultyService) { }

  ngOnInit() {
    this.difficulties = this.difficultyService.getDifficulties();
    this.startNewGame();
  }

  startNewGame() {
    this.selectedDifficultyId = this.getDefaultDifficultyId(this.selectedDifficultyId, this.difficulties);
    this.selectedDifficulty = this.difficulties[this.selectedDifficultyId];
    this.squares = this.initializeSquares(this.maxSquareCount);
    this.players = this.initializePlayers(this.selectedDifficulty);
    this.currentPlayer = this.players[0];
    this.winner = null;
    this.isDrawMatch = false;
    setInterval(
      () => this.artificialIntelligenceTryToMove(
        this.currentPlayer,
        this.winner,
        this.isDrawMatch,
        this.squares,
        this.winningCombinations),
      this.tryToMoveIntervalInMilliseconds);
  }

  getDefaultDifficultyId(selectedDifficultyId: number, difficulties: Difficulty[]): number {
    if (selectedDifficultyId) {
      return selectedDifficultyId;
    }
    else {
      return difficulties.length - 1;
    }
  }

  initializeSquares(maxSquareCount: number): Square[] {
    let squares: Square[] = [];
    for (let squareCount = 1; squareCount <= maxSquareCount; squareCount++) {
      squares.push(new Square(squareCount, ''));
    }
    return squares;
  }

  initializePlayers(difficulty: Difficulty): Player[] {
    let players: Player[] = [];
    players.push(new Player(1, 'X', true, DifficultyLevel.None));
    players.push(new Player(2, 'O', false, difficulty.difficultyLevel));
    return players;
  }

  artificialIntelligenceTryToMove(currentPlayer: Player, winner: Player, isDrawMatch: boolean, squares: Square[], winningCombinations: Array<[number, number, number]>) {
    if (this.isPossibleToPlayForArtificialIntelligence(winner, currentPlayer, isDrawMatch)) {
      let enableSquares: Square[] = this.getEnableSquares(squares);
      let squareToPlay = this.artificialIntelligenceBrainService.chooseSquare(squares, enableSquares, currentPlayer.difficultyLevel, winningCombinations, currentPlayer);
      this.makeMove(squareToPlay);
    }
  }

  getEnableSquares(squares: Square[]): Square[] {
    return squares.filter(square => !square.value);
  }

  squareClick(square: Square): void {
    if (this.isPossibleToPlayForHuman(square, this.winner, this.currentPlayer)) {
      this.makeMove(square);
    }
  }

  isPossibleToPlayForHuman(square: Square, winner: Player, currentPlayer: Player): boolean {
    return !square.value && !winner && currentPlayer.isHuman;
  }

  isPossibleToPlayForArtificialIntelligence(winner: Player, currentPlayer: Player, isDrawMatch: boolean): boolean {
    return currentPlayer && !currentPlayer.isHuman && !winner && !isDrawMatch;
  }

  makeMove(square: Square): void {
    square = this.updateSquareValue(square, this.currentPlayer);
    this.winner = this.determineWinner(this.winningCombinations, this.squares, this.currentPlayer);
    this.isDrawMatch = this.determineIsDrawMatch(this.squares, this.winner);
    this.currentPlayer = this.updateCurrentPlayer(this.currentPlayer, this.players);
  }

  updateSquareValue(square: Square, currentPlayer: Player): Square {
    square.value = currentPlayer.symbol;
    return square;
  }

  determineWinner(winningCombinations: Array<[number, number, number]>, squares: Square[], player: Player): Player {
    for (let winningCombination of winningCombinations) {
      if (squares[winningCombination[0] - 1].value == player.symbol
        && squares[winningCombination[1] - 1].value == player.symbol
        && squares[winningCombination[2] - 1].value == player.symbol) {
        return player;
      }
    }
    return null;
  }

  determineIsDrawMatch(squares: Square[], winner: Player): boolean {
    if (!winner && this.getEnableSquares(squares).length == 0) {
      return true;
    }
    else {
      return false;
    }
  }

  updateCurrentPlayer(currentPlayer: Player, players: Player[]): Player {
    if (currentPlayer == players[0]) {
      return players[1];
    }
    else {
      return players[0];
    }
  }
}
