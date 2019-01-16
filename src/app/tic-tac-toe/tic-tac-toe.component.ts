import { Component, OnInit } from '@angular/core';
import { Square } from './square';
import { Player } from './player';
import { ArtificialIntelligenceBrainService } from './artificial-intelligence-brain.service';
import { Difficulty } from '../difficulty/difficulty';
import { DifficultyService } from '../difficulty/difficulty.service';
import { Move } from './move';
import { DifficultyLevel } from '../difficulty/difficulty-level';

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
  currentGameMoves: Move[] = [];
  historyGamesMoves: Move[][] = [];
  trainingGameCount: string = "10";
  trainingGameDoneCount: number = 0;
  isValidTrainingGameCount: boolean = true;
  isTrainingRunning: boolean = false;
  maximalTrainingGameCount: number = 1000000;

  constructor(private artificialIntelligenceBrainService: ArtificialIntelligenceBrainService, private difficultyService: DifficultyService) { }

  ngOnInit() {
    this.difficulties = this.difficultyService.getDifficulties();
    let defaultDifficulty: Difficulty = this.getDefaultDifficulty(this.difficulties);
    this.nextGamePlayers = this.initializeDefaultPlayers(defaultDifficulty);
    this.startNewGameInUserInterface();
  }

  startNewAutomaticGame() {
    this.squares = this.initializeSquares(this.maxSquareCount);
    this.currentPlayer = this.players[0];
    this.winner = null;
    this.isDrawMatch = false;
    this.historyGamesMoves = this.memorizeGameMoves(this.historyGamesMoves, this.currentGameMoves);
    this.currentGameMoves = [];
  }

  startNewGameInUserInterface() {
    this.players = this.initializePlayers(this.nextGamePlayers);
    this.startNewAutomaticGame();
    setInterval(
      () => this.artificialIntelligenceTryToMove(
        this.currentPlayer,
        this.winner,
        this.isDrawMatch,
        this.squares,
        this.winningCombinations,
        this.players,
        this.historyGamesMoves,
        this.currentGameMoves),
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

  initializeAutomaticGamePlayers(): Player[] {
    let players: Player[] = [];
    let difficulty: Difficulty = new Difficulty(0, 'Facile', DifficultyLevel.Easy);
    players.push(new Player(1, 'X', false, difficulty));
    players.push(new Player(2, 'O', false, difficulty));
    return players;
  }

  initializePlayers(nextGamePlayers: Player[]): Player[] {
    let players: Player[] = nextGamePlayers.map(player => Object.assign({}, player));
    return players;
  }

  artificialIntelligenceTryToMove(currentPlayer: Player, winner: Player, isDrawMatch: boolean, squares: Square[], winningCombinations: Array<[number, number, number]>, players: Player[], historyGamesMoves: Move[][], currentGameMoves: Move[]) {
    if (this.isPossibleToPlayForArtificialIntelligence(winner, currentPlayer, isDrawMatch)) {
      let enableSquares: Square[] = this.getEnableSquares(squares);
      let squareToPlay = this.artificialIntelligenceBrainService.chooseSquare(squares, enableSquares, currentPlayer.difficulty.difficultyLevel, winningCombinations, currentPlayer, players, historyGamesMoves, currentGameMoves);
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
    this.currentGameMoves = this.memorizeMove(this.currentGameMoves, this.currentPlayer, square, this.winner);
    this.currentPlayer = this.updateCurrentPlayer(this.currentPlayer, this.players);
    this.displayVictoryLine(this.winningCombinations, this.squares, this.winner);
  }

  memorizeMove(moves: Move[], player: Player, square: Square, winner: Player): Move[] {
    let isWinningMove: boolean = (winner != null);
    let move: Move = new Move(player.symbol, square.id, isWinningMove);
    moves.push(move);
    return moves;
  }

  memorizeGameMoves(gamesMoves: Move[][], moves: Move[]): Move[][] {
    if (moves != null && moves.length > 0) {
      let cloneMoves: Move[] = moves.map(move => Object.assign({}, move));
      gamesMoves.push(cloneMoves);
    }
    return gamesMoves;
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

  isMachineLearningInformationsNeeded(players: Player[]): boolean {
    let isMachineLearningInformationsNeeded: boolean = false;
    for (let player of players) {
      if (!player.isHuman && player.difficulty.difficultyLevel == DifficultyLevel.MachingLearning) {
        isMachineLearningInformationsNeeded = true;
      }
    }
    return isMachineLearningInformationsNeeded;
  }

  parseNumberToFrenchLocaleString(numberToParse: number): string {
    return numberToParse.toLocaleString('fr-FR');
  }

  getHistoryGamesMovesLength(historyGamesMoves: Move[][]): string {
    if (historyGamesMoves != null && historyGamesMoves[0] != null && historyGamesMoves[0][0] != null) {
      return this.parseNumberToFrenchLocaleString(historyGamesMoves.length);
    }
    else {
      return "0";
    }
  }

  isPositiveInteger(stringToCheck: string): boolean {
    return /^\d+$/.test(stringToCheck);
  }

  determineIfIsValidTrainingGameCount(stringToCheck: string, maximalValueAuthorized:number): boolean {
    return this.isPositiveInteger(stringToCheck) && parseInt(stringToCheck) <= maximalValueAuthorized;
  }

  delay(milliseconds: number, count: number): Promise<number> {
    return new Promise<number>(resolve => {
      setTimeout(() => {
        resolve(count);
      }, milliseconds);
    });
  }

  isAMultipleOf(numberToCkeck, multipleValue): boolean {
    return numberToCkeck % multipleValue == 0;
  }

  async playAutomaticGames(trainingGameCount: number): Promise<void> {
    await this.delay(1, 0);
    this.trainingGameDoneCount = 0;
    let memorizedPlayers: Player[] = this.players.map(player => Object.assign({}, player));
    this.players = this.initializeAutomaticGamePlayers();
    while (this.trainingGameDoneCount < trainingGameCount) {
      if (this.isPossibleToPlayForArtificialIntelligence(this.winner, this.currentPlayer, this.isDrawMatch)) {
        this.artificialIntelligenceTryToMove(
          this.currentPlayer,
          this.winner,
          this.isDrawMatch,
          this.squares,
          this.winningCombinations,
          this.players,
          this.historyGamesMoves,
          this.currentGameMoves);
        if (!this.isPossibleToPlayForArtificialIntelligence(this.winner, this.currentPlayer, this.isDrawMatch)) {
          this.trainingGameDoneCount++;
          if (this.isAMultipleOf(this.trainingGameDoneCount, 1000)) {
            await this.delay(1, 0);
          }
        }
      }
      else {
        this.startNewAutomaticGame();
      }
    }
    this.players = memorizedPlayers;
    this.startNewGameInUserInterface();
  }

  async startTraining(trainingGameCount: string): Promise<void> {
    this.isValidTrainingGameCount = this.determineIfIsValidTrainingGameCount(trainingGameCount, this.maximalTrainingGameCount);
    if (this.isValidTrainingGameCount) {
      this.isTrainingRunning = true;
      await this.playAutomaticGames(parseInt(trainingGameCount));
      this.isTrainingRunning = false;
    }
  }

  getAdvancementLabel(trainingGameDoneCount: number, trainingGameCount: string): string {
    return Math.round(trainingGameDoneCount / parseInt(trainingGameCount) * 100) + "%";
  }

  getMaximalTrainingGameCount(): string {
    return this.parseNumberToFrenchLocaleString(this.maximalTrainingGameCount);
  }
}