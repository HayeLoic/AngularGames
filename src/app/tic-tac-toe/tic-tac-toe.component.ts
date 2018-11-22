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
  nextGamePlayers: Player[] = [];
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
  switchModel: any = {
    checkedLabel: "Humain",
    uncheckedLabel: "Ordinateur",
    defaultBgColor: "#DADADA",
    size: "large"
  };

  constructor(private artificialIntelligenceBrainService: ArtificialIntelligenceBrainService, private difficultyService: DifficultyService) { }

  ngOnInit() {
    this.difficulties = this.difficultyService.getDifficulties();
    let defaultDifficulty: Difficulty = this.getDefaultDifficulty(this.difficulties);
    this.nextGamePlayers = this.initializeDefaultPlayers(defaultDifficulty);
    this.startNewGame();
  }

  startNewGame() {
    this.squares = this.initializeSquares(this.maxSquareCount);
    this.players = this.initializePlayers(this.nextGamePlayers);
    this.currentPlayer = this.players[0];
    this.winner = null;
    this.isDrawMatch = false;
    setInterval(
      () => this.artificialIntelligenceTryToMove(
        this.currentPlayer,
        this.winner,
        this.isDrawMatch,
        this.squares,
        this.winningCombinations,
        this.players),
      this.tryToMoveIntervalInMilliseconds);
  }

  getDefaultDifficulty(difficulties: Difficulty[]): Difficulty {
    return difficulties[difficulties.length - 1];
  }

  initializeSquares(maxSquareCount: number): Square[] {
    let squares: Square[] = [];
    for (let squareCount = 1; squareCount <= maxSquareCount; squareCount++) {
      squares.push(new Square(squareCount, ''));
    }
    return squares;
  }

  initializeDefaultPlayers(difficulty: Difficulty): Player[] {
    let players: Player[] = [];
    players.push(new Player(1, 'X', true, difficulty));
    players.push(new Player(2, 'O', false, difficulty));
    return players;
  }

  initializePlayers(nextGamePlayers: Player[]): Player[] {
    let players: Player[] = nextGamePlayers.map(player => Object.assign({}, player));
    return players;
  }

  artificialIntelligenceTryToMove(currentPlayer: Player, winner: Player, isDrawMatch: boolean, squares: Square[], winningCombinations: Array<[number, number, number]>, players: Player[]) {
    if (this.isPossibleToPlayForArtificialIntelligence(winner, currentPlayer, isDrawMatch)) {
      let enableSquares: Square[] = this.getEnableSquares(squares);
      let squareToPlay = this.artificialIntelligenceBrainService.chooseSquare(squares, enableSquares, currentPlayer.difficulty.difficultyLevel, winningCombinations, currentPlayer, players);
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
    this.displayVictoryLine(this.winningCombinations, this.squares, this.winner);
  }

  updateSquareValue(square: Square, currentPlayer: Player): Square {
    square.value = currentPlayer.symbol;
    return square;
  }

  isVictoriousCombination(winningCombination: [number, number, number], squares: Square[], player: Player): boolean {
    return squares[winningCombination[0] - 1].value == player.symbol
      && squares[winningCombination[1] - 1].value == player.symbol
      && squares[winningCombination[2] - 1].value == player.symbol
  }

  determineWinner(winningCombinations: Array<[number, number, number]>, squares: Square[], player: Player): Player {
    for (let winningCombination of winningCombinations) {
      if (this.isVictoriousCombination(winningCombination, squares, player)) {
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

  drawVictoriousLine(winningCombination: [number, number, number], squares: Square[]): void {
    for (let index = 0; index < winningCombination.length; index++) {
      let winningCombinationValue = winningCombination[index];
      squares[winningCombinationValue - 1].isWinningSquare = true;
    }
  }

  displayVictoryLine(winningCombinations: Array<[number, number, number]>, squares: Square[], winner: Player): void {
    if (winner) {
      for (let winningCombination of winningCombinations) {
        if (this.isVictoriousCombination(winningCombination, squares, winner)) {
          this.drawVictoriousLine(winningCombination, squares);
        }
      }
    }
  }
}
