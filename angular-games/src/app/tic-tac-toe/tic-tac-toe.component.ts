import { Component, OnInit } from '@angular/core';
import { Square } from './square';
import { Player } from './player';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
  squares: Square[] = [];
  players: Player[] = [];
  maxSquareCount: number = 9;
  currentPlayer: Player = null;
  winner: Player = null;
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

  constructor() { }

  ngOnInit() {
    this.squares = this.initializeSquares(this.maxSquareCount);
    this.players = this.initializePlayers();
    this.currentPlayer = this.players[0];
  }

  initializeSquares(maxSquareCount: number): Square[] {
    let squares: Square[] = [];
    for (let squareCount = 1; squareCount <= maxSquareCount; squareCount++) {
      squares.push(new Square(squareCount, ''));
    }
    return squares;
  }

  initializePlayers(): Player[] {
    let players: Player[] = [];
    players.push(new Player(1, 'X'));
    players.push(new Player(2, 'O'));
    return players;
  }

  squareClick(square: Square): void {
    if (this.isPossibleToPlay(square, this.winner) {
      square = this.updateSquareValue(square, this.currentPlayer);
      this.winner = this.determineWinner(this.winningCombinations, this.squares, this.currentPlayer);
      this.currentPlayer = this.updateCurrentPlayer(this.currentPlayer, this.players);
    }
  }

  isPossibleToPlay(square: Square, winner: Player): boolean {
    return !square.value && !winner;
  }

  updateSquareValue(square: Square, currentPlayer: Player): Square {
    square.value = currentPlayer.symbol;
    return square;
  }

  determineWinner(winningCombinations: Array<[number, number, number]>, squares: Square[], player: Player): Player {
    let winner: Player = null;
    for (let winningCombination of winningCombinations) {
      if (squares[winningCombination[0] - 1].value == player.symbol
        && squares[winningCombination[1] - 1].value == player.symbol
        && squares[winningCombination[2] - 1].value == player.symbol) {
        winner = player;
      }
    }
    return winner;
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
