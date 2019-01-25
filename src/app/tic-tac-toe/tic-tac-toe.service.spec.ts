import { TestBed, inject, async } from '@angular/core/testing';

import { TicTacToeService } from './tic-tac-toe.service';
import { Difficulty } from '../difficulty/difficulty';
import { DifficultyLevel } from '../difficulty/difficulty-level';
import { Square } from './square';
import { Player } from './player';
import { Move } from './move';

describe('TicTacToeService', () => {
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
  
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', inject([TicTacToeService], (service: TicTacToeService) => {
    expect(service).toBeTruthy();
  }));

  it('getDefaultDifficulty should return [difficultyMedium]', inject([TicTacToeService], (service: TicTacToeService) => {
    let difficulties: Difficulty[] = [];
    difficulties.push(new Difficulty(0, 'Facile', DifficultyLevel.Easy));
    difficulties.push(new Difficulty(1, 'Moyen', DifficultyLevel.Medium));
    expect(service.getDefaultDifficulty(difficulties).difficultyLevel).toBe(difficultyMedium.difficultyLevel);
  }));

  it('getDefaultDifficulty should return [difficultyHard]', inject([TicTacToeService], (service: TicTacToeService) => {
    let difficulties: Difficulty[] = [];
    difficulties.push(new Difficulty(1, 'Facile', DifficultyLevel.Easy));
    difficulties.push(new Difficulty(2, 'Moyen', DifficultyLevel.Medium));
    difficulties.push(new Difficulty(3, 'Difficile', DifficultyLevel.Hard));
    expect(service.getDefaultDifficulty(difficulties).difficultyLevel).toBe(difficultyHard.difficultyLevel);
  }));

  it('getEnableSquares should return [0] square', inject([TicTacToeService], (service: TicTacToeService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, 'O', 'B1'));
    squares.push(new Square(3, 'X', 'C1'));
    squares.push(new Square(4, 'O', 'A2'));
    let result = service.getEnableSquares(squares);
    expect(result.length).toBe(0);
  }));

  it('getEnableSquares should return [2] squares', inject([TicTacToeService], (service: TicTacToeService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, 'O', 'A2'));
    let result = service.getEnableSquares(squares);
    expect(result.length).toBe(2);
  }));

  it('getEnableSquares should return a square with id = [2]', inject([TicTacToeService], (service: TicTacToeService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, 'X', 'C1'));
    squares.push(new Square(4, 'O', 'A2'));
    let result = service.getEnableSquares(squares);
    expect(result[0].id).toBe(2);
  }));

  it('getEnableSquares should return squares with id = [2] and [4]', inject([TicTacToeService], (service: TicTacToeService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, 'O', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    let expectedResult: Square[] = [];
    expectedResult.push(new Square(2, '', 'B1'));
    expectedResult.push(new Square(4, '', 'A2'));
    let result = service.getEnableSquares(squares);
    expect(result).toEqual(expectedResult);
  }));

  it('isPossibleToPlayForArtificialIntelligence should return [false]', inject([TicTacToeService], (service: TicTacToeService) => {
    let currentPlayer: Player = new Player(1, 'X', true, difficultyNone);
    let winner: Player;
    let isDrawMatch: boolean;
    expect(service.isPossibleToPlayForArtificialIntelligence(winner, currentPlayer, isDrawMatch)).toBe(false);
  }));

  it('isPossibleToPlayForArtificialIntelligence should return [true]', inject([TicTacToeService], (service: TicTacToeService) => {
    let currentPlayer: Player = new Player(1, 'X', false, difficultyNone);
    let winner: Player;
    let isDrawMatch: boolean = false;
    expect(service.isPossibleToPlayForArtificialIntelligence(winner, currentPlayer, isDrawMatch)).toBe(true);
  }));

  it('isPossibleToPlayForArtificialIntelligence should return [false]', inject([TicTacToeService], (service: TicTacToeService) => {
    let currentPlayer: Player = new Player(1, 'X', false, difficultyNone);
    let winner: Player;
    let isDrawMatch: boolean = true;
    expect(service.isPossibleToPlayForArtificialIntelligence(winner, currentPlayer, isDrawMatch)).toBe(false);
  }));

  it('isPossibleToPlayForArtificialIntelligence should return [false]', inject([TicTacToeService], (service: TicTacToeService) => {
    let currentPlayer: Player = new Player(1, 'X', false, difficultyNone);
    let winner: Player = currentPlayer;
    let isDrawMatch: boolean = true;
    expect(service.isPossibleToPlayForArtificialIntelligence(winner, currentPlayer, isDrawMatch)).toBe(false);
  }));

  it('isPossibleToPlayForArtificialIntelligence should return [false]', inject([TicTacToeService], (service: TicTacToeService) => {
    let currentPlayer: Player = new Player(1, 'X', false, difficultyNone);
    let winner: Player = currentPlayer;
    let isDrawMatch: boolean = false;
    expect(service.isPossibleToPlayForArtificialIntelligence(winner, currentPlayer, isDrawMatch)).toBe(false);
  }));

  it('isPossibleToPlayForHuman should return [true]', inject([TicTacToeService], (service: TicTacToeService) => {
    let square: Square = new Square(1, '', 'A1');
    let winner: Player;
    let currentPlayer: Player = new Player(1, 'X', true, difficultyNone);
    expect(service.isPossibleToPlayForHuman(square, winner, currentPlayer)).toBe(true);
  }));

  it('isPossibleToPlayForHuman should return [false]', inject([TicTacToeService], (service: TicTacToeService) => {
    let square: Square = new Square(1, 'X', 'A1');
    let winner: Player;
    let currentPlayer: Player = new Player(1, 'X', true, difficultyNone);
    expect(service.isPossibleToPlayForHuman(square, winner, currentPlayer)).toBe(false);
  }));

  it('isPossibleToPlayForHuman should return [false]', inject([TicTacToeService], (service: TicTacToeService) => {
    let square: Square = new Square(1, '', 'A1');
    let winner: Player = new Player(2, 'O', true, difficultyNone);
    let currentPlayer: Player = new Player(1, 'X', true, difficultyNone);
    expect(service.isPossibleToPlayForHuman(square, winner, currentPlayer)).toBe(false);
  }));

  it('isVictoriousCombination should return [true]', inject([TicTacToeService], (service: TicTacToeService) => {
    let winningCombination: [number, number, number] = [1, 2, 3];
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, 'X', 'B1'));
    squares.push(new Square(3, 'X', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let player: Player = new Player(1, 'X', true, difficultyNone);
    expect(service.isVictoriousCombination(winningCombination, squares, player)).toBe(true);
  }));

  it('isVictoriousCombination should return [false]', inject([TicTacToeService], (service: TicTacToeService) => {
    let winningCombination: [number, number, number] = [1, 2, 3];
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, 'O', 'B1'));
    squares.push(new Square(3, 'X', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let player: Player = new Player(1, 'X', true, difficultyNone);
    expect(service.isVictoriousCombination(winningCombination, squares, player)).toBe(false);
  }));

  it('determineWinner should return [null]', inject([TicTacToeService], (service: TicTacToeService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let player: Player = new Player(1, 'X', true, difficultyNone);
    expect(service.determineWinner(winningCombinations, squares, player)).toBe(null);
  }));

  it('determineWinner should return Player [1]', inject([TicTacToeService], (service: TicTacToeService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, 'X', 'B1'));
    squares.push(new Square(3, 'X', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let player: Player = new Player(1, 'X', true, difficultyNone);
    let result = service.determineWinner(winningCombinations, squares, player);
    expect(result.id).toBe(1);
  }));

  it('determineWinner should return Player [1]', inject([TicTacToeService], (service: TicTacToeService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, 'X', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, 'X', 'C3'));
    let player: Player = new Player(1, 'X', true, difficultyNone);
    let result = service.determineWinner(winningCombinations, squares, player);
    expect(result.id).toBe(1);
  }));

  it('determineWinner should return Player [1]', inject([TicTacToeService], (service: TicTacToeService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, 'X', 'A2'));
    squares.push(new Square(5, 'X', 'B2'));
    squares.push(new Square(6, 'X', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let player: Player = new Player(1, 'X', true, difficultyNone);
    let result = service.determineWinner(winningCombinations, squares, player);
    expect(result.id).toBe(1);
  }));

  it('determineWinner should return Player [1]', inject([TicTacToeService], (service: TicTacToeService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, 'X', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, 'X', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, 'X', 'C3'));
    let player: Player = new Player(1, 'X', true, difficultyNone);
    let result = service.determineWinner(winningCombinations, squares, player);
    expect(result.id).toBe(1);
  }));

  it('determineIsDrawMatch should return [false]', inject([TicTacToeService], (service: TicTacToeService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, 'X', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, 'X', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, 'X', 'C3'));
    let winner: Player = new Player(1, 'X', true, difficultyNone);
    expect(service.determineIsDrawMatch(squares, winner)).toBe(false);
  }));

  it('determineIsDrawMatch should return [false]', inject([TicTacToeService], (service: TicTacToeService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, 'X', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, 'X', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, 'X', 'C3'));
    let winner: Player;
    expect(service.determineIsDrawMatch(squares, winner)).toBe(false);
  }));

  it('determineIsDrawMatch should return [true]', inject([TicTacToeService], (service: TicTacToeService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, 'O', 'B1'));
    squares.push(new Square(3, 'X', 'C1'));
    squares.push(new Square(4, 'O', 'A2'));
    squares.push(new Square(5, 'O', 'B2'));
    squares.push(new Square(6, 'X', 'C2'));
    squares.push(new Square(7, 'X', 'A3'));
    squares.push(new Square(8, 'X', 'B3'));
    squares.push(new Square(9, 'O', 'C3'));
    let winner: Player;
    expect(service.determineIsDrawMatch(squares, winner)).toBe(true);
  }));

  it('memorizeMove should increase moves array length to [1]', inject([TicTacToeService], (service: TicTacToeService) => {
    let moves: Move[] = [];
    let player: Player = new Player(1, 'X', true, difficultyNone);
    let square: Square = new Square(1, 'X', 'A1');
    moves = service.memorizeMove(moves, player, square, null);
    expect(moves.length).toBe(1);
  }));

  it('isPositiveInteger should return [true]', inject([TicTacToeService], (service: TicTacToeService) => {
    expect(service.isPositiveInteger("5")).toBe(true);
  }));

  it('isPositiveInteger should return [false] for empty value', inject([TicTacToeService], (service: TicTacToeService) => {
    expect(service.isPositiveInteger("")).toBe(false);
  }));

  it('isPositiveInteger should return [false] for stringValue', inject([TicTacToeService], (service: TicTacToeService) => {
    expect(service.isPositiveInteger("stringValue")).toBe(false);
  }));

  it('isPositiveInteger should return [false] for 1.5', inject([TicTacToeService], (service: TicTacToeService) => {
    expect(service.isPositiveInteger("1.5")).toBe(false);
  }));

  it('isPositiveInteger should return [false] for 1,5', inject([TicTacToeService], (service: TicTacToeService) => {
    expect(service.isPositiveInteger("1,5")).toBe(false);
  }));

  it('isPositiveInteger should return [false] for -1', inject([TicTacToeService], (service: TicTacToeService) => {
    expect(service.isPositiveInteger("-1")).toBe(false);
  }));

  it('isAMultipleOf should return [false] for 7 is a multiple of 10', inject([TicTacToeService], (service: TicTacToeService) => {
    expect(service.isAMultipleOf(7, 10)).toBe(false);
  }));

  it('isAMultipleOf should return [false] for 10 is a multiple of 7', inject([TicTacToeService], (service: TicTacToeService) => {
    expect(service.isAMultipleOf(10, 7)).toBe(false);
  }));

  it('isAMultipleOf should return [false] for 100 is a multiple of 10000', inject([TicTacToeService], (service: TicTacToeService) => {
    expect(service.isAMultipleOf(100, 10000)).toBe(false);
  }));

  it('isAMultipleOf should return [true] for 10000 is a multiple of 100', inject([TicTacToeService], (service: TicTacToeService) => {
    expect(service.isAMultipleOf(10000, 100)).toBe(true);
  }));
  
  it('determineIfIsValidTrainingGameCount should return [false]', inject([TicTacToeService], (service: TicTacToeService) => {
    expect(service.determineIfIsValidTrainingGameCount("", 1000000)).toBe(false);
  }));
  
  it('determineIfIsValidTrainingGameCount should return [false]', inject([TicTacToeService], (service: TicTacToeService) => {
    expect(service.determineIfIsValidTrainingGameCount("1000001", 1000000)).toBe(false);
  }));
  
  it('determineIfIsValidTrainingGameCount should return [true]', inject([TicTacToeService], (service: TicTacToeService) => {
    expect(service.determineIfIsValidTrainingGameCount("1", 1000000)).toBe(true);
  }));
  
  it('determineIfIsValidTrainingGameCount should return [true]', inject([TicTacToeService], (service: TicTacToeService) => {
    expect(service.determineIfIsValidTrainingGameCount("1000000", 1000000)).toBe(true);
  }));
});
