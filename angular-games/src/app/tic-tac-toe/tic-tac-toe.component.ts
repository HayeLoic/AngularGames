import { Component, OnInit } from '@angular/core';
import { Square } from './square';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
  squares: Square[] = [];
  maxSquareCount: Number = 9;

  constructor() { }

  ngOnInit() {
    for (let squareCount = 1; squareCount <= this.maxSquareCount; squareCount++) {
      this.squares.push(new Square(squareCount, ''));
    }
  }
}
