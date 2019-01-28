import { Component, OnInit } from '@angular/core';
import { TicTacToeService } from './tic-tac-toe.service';
import { Player } from './player';
import { Square } from './square';
import { Difficulty } from '../difficulty/difficulty';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
  switchModel: any = {
    checkedLabel: "Humain",
    uncheckedLabel: "Ordinateur",
    defaultBgColor: "#DADADA",
    size: "large"
  };
  trainingGameCount: string = "10";

  constructor(private ticTacToeService: TicTacToeService) { }

  ngOnInit() {
    this.ticTacToeService.initialize();
  }

  isMachineLearningInformationsNeeded(): boolean {
    return this.ticTacToeService.isMachineLearningInformationsNeeded();
  }

  getHistoryGamesMovesLength(): string {
    return this.ticTacToeService.getHistoryGamesMovesLength(this.ticTacToeService.historyGamesMoves);
  }

  startNewGameInUserInterface(): void {
    this.ticTacToeService.startNewGameInUserInterface();
  }

  getAdvancementLabel(trainingGameDoneCount: number, trainingGameCount: string): string {
    return this.ticTacToeService.getAdvancementLabel(trainingGameDoneCount, trainingGameCount);
  }

  getMaximalTrainingGameCount(): string {
    return this.ticTacToeService.getMaximalTrainingGameCount();
  }

  async startTraining(trainingGameCount: string): Promise<void> {
    this.ticTacToeService.startTraining(trainingGameCount);
  }

  getIsTrainingRunning(): boolean {
    return this.ticTacToeService.isTrainingRunning;
  }

  getIsValidTrainingGameCount(): boolean {
    return this.ticTacToeService.isValidTrainingGameCount;
  }

  getTrainingGameDoneCount(): number {
    return this.ticTacToeService.trainingGameDoneCount;
  }

  getIsDrawMatch(): boolean {
    return this.ticTacToeService.isDrawMatch;
  }

  getDifficulties(): Difficulty[] {
    return this.ticTacToeService.difficulties;
  }

  hasToShowNextPlayerLabel(): boolean {
    return this.ticTacToeService.hasToShowNextPlayerLabel();
  }

  isThereWinner(): boolean {
    return this.ticTacToeService.isThereWinner();
  }

  getWinnerSymbol(): string {
    return this.ticTacToeService.getWinnerSymbol();
  }

  getCurrentPlayerSymbol(): string {
    return this.ticTacToeService.getCurrentPlayerSymbol();
  }

  getNextGamePlayers(): Player[] {
    return this.ticTacToeService.nextGamePlayers;
  }

  isTherePlayer(): boolean {
    return this.ticTacToeService.isTherePlayer();
  }

  getPlayers(): Player[] {
    return this.ticTacToeService.players;
  }

  getSquares(): Square[] {
    return this.ticTacToeService.squares;
  }
}