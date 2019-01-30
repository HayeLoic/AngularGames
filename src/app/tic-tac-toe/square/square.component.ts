import { Component, OnInit, Input } from '@angular/core';
import { Square } from '../square';
import { TicTacToeService } from '../tic-tac-toe.service';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})

export class SquareComponent implements OnInit {
  @Input() square: Square;

  squareClick(square: Square): void {
    this.ticTacToeService.squareClick(square);
  }

  isWinningSquare(square: Square): boolean {
    return square && square.isWinningSquare;
  }

  getSquareValue(square: Square): string {
    if (square) {
      return square.value;
    } else {
      return "";
    }
  }

  constructor(private ticTacToeService: TicTacToeService) { }

  ngOnInit() {
  }
}