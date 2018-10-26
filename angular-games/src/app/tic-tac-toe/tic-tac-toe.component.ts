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
  maxSquareCount: Number = 9;
  currentPlayer: Player = null;

  constructor() { }

  ngOnInit() {
    this.squares = this.initializeSquares(this.maxSquareCount);
    this.players = this.initializePlayers();
    this.currentPlayer = this.players[0];
  }

  initializeSquares(maxSquareCount: Number): Square[] {
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
    if (!square.value) {
      square = this.updateSquareValue(square, this.currentPlayer);
      this.currentPlayer = this.updateCurrentPlayer(this.currentPlayer, this.players);
    }
  }

  updateSquareValue(square: Square, currentPlayer: Player): Square {
    square.value = currentPlayer.symbol;
    return square;
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
