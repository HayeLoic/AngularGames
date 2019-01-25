import { Component, OnInit } from '@angular/core';
import { TicTacToeService } from './tic-tac-toe.service';
import { Player } from './player';
import { Move } from './move';
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

  squares: Square[] = [];
  players: Player[] = [];
  nextGamePlayers: Player[] = [];
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
  currentGameMoves: Move[] = [];
  historyGamesMoves: Move[][] = [];
  trainingGameDoneCount: number = 0;
  isValidTrainingGameCount: boolean = true;
  isTrainingRunning: boolean = false;
  maximalTrainingGameCount: number = 1000000;

  constructor(private ticTacToeService: TicTacToeService) { }

  ngOnInit() {
  }

  isMachineLearningInformationsNeeded(players: Player[]): boolean {
    return this.isMachineLearningInformationsNeeded(players);
  }

  getHistoryGamesMovesLength(historyGamesMoves: Move[][]): string {
    return this.getHistoryGamesMovesLength(historyGamesMoves);
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
}