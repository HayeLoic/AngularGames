import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';

import { TicTacToeComponent } from './tic-tac-toe.component';
import { Difficulty } from '../difficulty/difficulty';
import { DifficultyLevel } from '../difficulty/difficulty-level';
import { Square } from './square';
import { Player } from './player';

describe('TicTacToeComponent', () => {
  let component: TicTacToeComponent;
  let fixture: ComponentFixture<TicTacToeComponent>;
  let winningCombinations: Array<[number, number, number]> = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
  let difficultyNone: Difficulty = new Difficulty(0, 'Aucune', DifficultyLevel.None);
  let difficultyMedium: Difficulty = new Difficulty(2, 'Moyen', DifficultyLevel.Medium);
  let difficultyHard: Difficulty = new Difficulty(3, 'Difficile', DifficultyLevel.Hard);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TicTacToeComponent],
      imports: [FormsModule, UiSwitchModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicTacToeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getDefaultDifficulty should return [difficultyMedium]', async(() => {
    let difficulties: Difficulty[] = [];
    difficulties.push(new Difficulty(0, 'Facile', DifficultyLevel.Easy));
    difficulties.push(new Difficulty(1, 'Moyen', DifficultyLevel.Medium));
    expect(component.getDefaultDifficulty(difficulties).difficultyLevel).toBe(difficultyMedium.difficultyLevel);
  }));

  it('getDefaultDifficulty should return [difficultyHard]', async(() => {
    let difficulties: Difficulty[] = [];
    difficulties.push(new Difficulty(1, 'Facile', DifficultyLevel.Easy));
    difficulties.push(new Difficulty(2, 'Moyen', DifficultyLevel.Medium));
    difficulties.push(new Difficulty(3, 'Difficile', DifficultyLevel.Hard));
    expect(component.getDefaultDifficulty(difficulties).difficultyLevel).toBe(difficultyHard.difficultyLevel);
  }));

  it('getEnableSquares should return [0] square', async(() => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, 'O'));
    squares.push(new Square(3, 'X'));
    squares.push(new Square(4, 'O'));
    let result = component.getEnableSquares(squares);
    expect(result.length).toBe(0);
  }));

  it('getEnableSquares should return [2] squares', async(() => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, 'O'));
    let result = component.getEnableSquares(squares);
    expect(result.length).toBe(2);
  }));

  it('getEnableSquares should return a square with id = [2]', async(() => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, 'X'));
    squares.push(new Square(4, 'O'));
    let result = component.getEnableSquares(squares);
    expect(result[0].id).toBe(2);
  }));

  it('getEnableSquares should return squares with id = [2] and [4]', async(() => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, 'O'));
    squares.push(new Square(4, ''));
    let expectedResult: Square[] = [];
    expectedResult.push(new Square(2, ''));
    expectedResult.push(new Square(4, ''));
    let result = component.getEnableSquares(squares);
    expect(result).toEqual(expectedResult);
  }));

  it('isPossibleToPlayForArtificialIntelligence should return [false]', async(() => {
    let currentPlayer: Player = new Player(1, 'X', true, difficultyNone);
    let winner: Player;
    let isDrawMatch: boolean;
    expect(component.isPossibleToPlayForArtificialIntelligence(winner, currentPlayer, isDrawMatch)).toBe(false);
  }));

  it('isPossibleToPlayForArtificialIntelligence should return [true]', async(() => {
    let currentPlayer: Player = new Player(1, 'X', false, difficultyNone);
    let winner: Player;
    let isDrawMatch: boolean = false;
    expect(component.isPossibleToPlayForArtificialIntelligence(winner, currentPlayer, isDrawMatch)).toBe(true);
  }));

  it('isPossibleToPlayForArtificialIntelligence should return [false]', async(() => {
    let currentPlayer: Player = new Player(1, 'X', false, difficultyNone);
    let winner: Player;
    let isDrawMatch: boolean = true;
    expect(component.isPossibleToPlayForArtificialIntelligence(winner, currentPlayer, isDrawMatch)).toBe(false);
  }));

  it('isPossibleToPlayForArtificialIntelligence should return [false]', async(() => {
    let currentPlayer: Player = new Player(1, 'X', false, difficultyNone);
    let winner: Player = currentPlayer;
    let isDrawMatch: boolean = true;
    expect(component.isPossibleToPlayForArtificialIntelligence(winner, currentPlayer, isDrawMatch)).toBe(false);
  }));

  it('isPossibleToPlayForArtificialIntelligence should return [false]', async(() => {
    let currentPlayer: Player = new Player(1, 'X', false, difficultyNone);
    let winner: Player = currentPlayer;
    let isDrawMatch: boolean = false;
    expect(component.isPossibleToPlayForArtificialIntelligence(winner, currentPlayer, isDrawMatch)).toBe(false);
  }));

  it('isPossibleToPlayForHuman should return [true]', async(() => {
    let square: Square = new Square(1, '');
    let winner: Player;
    let currentPlayer: Player = new Player(1, 'X', true, difficultyNone);
    expect(component.isPossibleToPlayForHuman(square, winner, currentPlayer)).toBe(true);
  }));

  it('isPossibleToPlayForHuman should return [false]', async(() => {
    let square: Square = new Square(1, 'X');
    let winner: Player;
    let currentPlayer: Player = new Player(1, 'X', true, difficultyNone);
    expect(component.isPossibleToPlayForHuman(square, winner, currentPlayer)).toBe(false);
  }));

  it('isPossibleToPlayForHuman should return [false]', async(() => {
    let square: Square = new Square(1, '');
    let winner: Player = new Player(2, 'O', true, difficultyNone);
    let currentPlayer: Player = new Player(1, 'X', true, difficultyNone);
    expect(component.isPossibleToPlayForHuman(square, winner, currentPlayer)).toBe(false);
  }));

  it('isVictoriousCombination should return [true]', async(() => {
    let winningCombination: [number, number, number] = [1, 2, 3];
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, 'X'));
    squares.push(new Square(3, 'X'));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let player: Player = new Player(1, 'X', true, difficultyNone);
    expect(component.isVictoriousCombination(winningCombination, squares, player)).toBe(true);
  }));

  it('isVictoriousCombination should return [false]', async(() => {
    let winningCombination: [number, number, number] = [1, 2, 3];
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, 'O'));
    squares.push(new Square(3, 'X'));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let player: Player = new Player(1, 'X', true, difficultyNone);
    expect(component.isVictoriousCombination(winningCombination, squares, player)).toBe(false);
  }));

  it('determineWinner should return [null]', async(() => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let player: Player = new Player(1, 'X', true, difficultyNone);
    expect(component.determineWinner(winningCombinations, squares, player)).toBe(null);
  }));

  it('determineWinner should return Player [1]', async(() => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, 'X'));
    squares.push(new Square(3, 'X'));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let player: Player = new Player(1, 'X', true, difficultyNone);
    let result = component.determineWinner(winningCombinations, squares, player);
    expect(result.id).toBe(1);
  }));

  it('determineWinner should return Player [1]', async(() => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, 'X'));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, 'X'));
    let player: Player = new Player(1, 'X', true, difficultyNone);
    let result = component.determineWinner(winningCombinations, squares, player);
    expect(result.id).toBe(1);
  }));

  it('determineWinner should return Player [1]', async(() => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, 'X'));
    squares.push(new Square(5, 'X'));
    squares.push(new Square(6, 'X'));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let player: Player = new Player(1, 'X', true, difficultyNone);
    let result = component.determineWinner(winningCombinations, squares, player);
    expect(result.id).toBe(1);
  }));

  it('determineWinner should return Player [1]', async(() => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, 'X'));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, 'X'));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, 'X'));
    let player: Player = new Player(1, 'X', true, difficultyNone);
    let result = component.determineWinner(winningCombinations, squares, player);
    expect(result.id).toBe(1);
  }));

  it('determineIsDrawMatch should return [false]', async(() => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, 'X'));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, 'X'));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, 'X'));
    let winner: Player = new Player(1, 'X', true, difficultyNone);
    expect(component.determineIsDrawMatch(squares, winner)).toBe(false);
  }));

  it('determineIsDrawMatch should return [false]', async(() => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, 'X'));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, 'X'));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, 'X'));
    let winner: Player;
    expect(component.determineIsDrawMatch(squares, winner)).toBe(false);
  }));

  it('determineIsDrawMatch should return [true]', async(() => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, 'O'));
    squares.push(new Square(3, 'X'));
    squares.push(new Square(4, 'O'));
    squares.push(new Square(5, 'O'));
    squares.push(new Square(6, 'X'));
    squares.push(new Square(7, 'X'));
    squares.push(new Square(8, 'X'));
    squares.push(new Square(9, 'O'));
    let winner: Player;
    expect(component.determineIsDrawMatch(squares, winner)).toBe(true);
  }));
});
