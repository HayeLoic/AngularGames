import { TestBed, inject } from '@angular/core/testing';

import { ArtificialIntelligenceBrainService } from './artificial-intelligence-brain.service';
import { Square } from './square';
import { Player } from './player';
import { DifficultyLevel } from '../difficulty/difficulty-level';
import { Difficulty } from '../difficulty/difficulty';
import { Move } from './move';
import { SquareStatistic } from './square-statistic';

describe('ArtificialIntelligenceBrainService', () => {
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
  let difficultyVeryHard: Difficulty = new Difficulty(4, 'Très difficile', DifficultyLevel.VeryHard);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtificialIntelligenceBrainService]
    });
  });

  it('should be created', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    expect(service).toBeTruthy();
  }));

  it('getRandomSquareIndex should return [9] distinct possibilities', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    let results: number[] = [];
    let distinctResults: number[] = [];

    for (let index = 0; index < 1000; index++) {
      results.push(service.getRandomSquareIndex(squares));
    }
    for (let index = 0; index < results.length; index++) {
      if (!distinctResults.includes(results[index])) {
        distinctResults.push(results[index]);
      }
    }
    expect(distinctResults.length).toBe(9);
  }));

  it('getRandomSquareIndex should return minimum value [0]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    let minimumValue: number;

    for (let index = 0; index < 1000; index++) {
      let randomValue: number = service.getRandomSquareIndex(squares);
      if (minimumValue == null || randomValue < minimumValue) {
        minimumValue = randomValue;
      }
    }
    expect(minimumValue).toBe(0);
  }));

  it('getRandomSquareIndex should return maximum value [8]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    let maximumValue: number;

    for (let index = 0; index < 1000; index++) {
      let randomValue: number = service.getRandomSquareIndex(squares);
      if (maximumValue == null || randomValue > maximumValue) {
        maximumValue = randomValue;
      }
    }
    expect(maximumValue).toBe(8);
  }));

  it('getWinningSquareIndex should return [undefined]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    expect(service.getWinningSquareIndex(squares, winningCombinations, player)).toBe(undefined);
  }));

  it('getWinningSquareIndex should return [2]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, 'X', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let player: Player = new Player(1, 'X', true, difficultyNone);
    expect(service.getWinningSquareIndex(squares, winningCombinations, player)).toBe(2);
  }));

  it('getWinningSquareIndex should return [4]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, 'X', 'B2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, 'X', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let player: Player = new Player(1, 'X', true, difficultyNone);
    expect(service.getWinningSquareIndex(squares, winningCombinations, player)).toBe(4);
  }));

  it('getWinningSquareIndex should return [4]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, 'X', 'B3'));
    squares.push(new Square(9, 'X', 'C3'));
    let player: Player = new Player(1, 'X', true, difficultyNone);
    expect(service.getWinningSquareIndex(squares, winningCombinations, player)).toBe(6);
  }));

  it('getOpponentWinningSquareIndex should return [undefined]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    let players: Player[] = [];
    players.push(new Player(1, 'X', true, difficultyNone));
    players.push(new Player(2, 'O', true, difficultyNone));
    let currentPlayer: Player = players[0];
    expect(service.getOpponentWinningSquareIndex(squares, winningCombinations, currentPlayer, players)).toBe(undefined);
  }));

  it('getOpponentWinningSquareIndex should return [2]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'O', 'A1'));
    squares.push(new Square(2, 'O', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let players: Player[] = [];
    players.push(new Player(1, 'X', true, difficultyNone));
    players.push(new Player(2, 'O', true, difficultyNone));
    let currentPlayer: Player = players[0];
    expect(service.getOpponentWinningSquareIndex(squares, winningCombinations, currentPlayer, players)).toBe(2);
  }));

  it('getOpponentWinningSquareIndex should return [undefined]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, 'X', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let players: Player[] = [];
    players.push(new Player(1, 'X', true, difficultyNone));
    players.push(new Player(2, 'O', true, difficultyNone));
    let currentPlayer: Player = players[0];
    expect(service.getOpponentWinningSquareIndex(squares, winningCombinations, currentPlayer, players)).toBe(undefined);
  }));

  it('getOpponentWinningSquareIndex should return [8]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, 'X', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, 'V', 'A3'));
    squares.push(new Square(8, 'V', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let players: Player[] = [];
    players.push(new Player(1, 'X', true, difficultyNone));
    players.push(new Player(2, 'O', true, difficultyNone));
    players.push(new Player(3, 'V', true, difficultyNone));
    let currentPlayer: Player = players[0];
    expect(service.getOpponentWinningSquareIndex(squares, winningCombinations, currentPlayer, players)).toBe(8);
  }));

  it('getOpponentWinningSquareIndex should return [5]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, 'X', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, 'O', 'A2'));
    squares.push(new Square(5, 'O', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, 'V', 'A3'));
    squares.push(new Square(8, 'V', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let players: Player[] = [];
    players.push(new Player(1, 'X', true, difficultyNone));
    players.push(new Player(2, 'O', true, difficultyNone));
    players.push(new Player(3, 'V', true, difficultyNone));
    let currentPlayer: Player = players[0];
    expect(service.getOpponentWinningSquareIndex(squares, winningCombinations, currentPlayer, players)).toBe(5);
  }));

  it('getSquareToPlayInEasyDifficultyLevel should return each possible square [9]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    let results: Square[] = [];
    let distinctResults: Square[] = [];

    for (let index = 0; index < 1000; index++) {
      results.push(service.getSquareToPlayInEasyDifficultyLevel(squares));
    }
    for (let index = 0; index < results.length; index++) {
      if (!distinctResults.includes(results[index])) {
        distinctResults.push(results[index]);
      }
    }
    expect(distinctResults.length).toBe(9);
  }));

  it('getSquareToPlayInMediumDifficultyLevel should return Square with id = [1]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, 'X', 'B1'));
    squares.push(new Square(3, 'X', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let enableSquares: Square[] = squares.filter(square => !square.value);
    let currentPlayer: Player = new Player(1, 'X', true, difficultyNone);
    expect(service.getSquareToPlayInMediumDifficultyLevel(squares, enableSquares, winningCombinations, currentPlayer).id).toBe(1);
  }));

  it('getSquareToPlayInMediumDifficultyLevel should return Square with id = [5]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, 'X', 'C3'));
    let enableSquares: Square[] = squares.filter(square => !square.value);
    let currentPlayer: Player = new Player(1, 'X', true, difficultyNone);
    expect(service.getSquareToPlayInMediumDifficultyLevel(squares, enableSquares, winningCombinations, currentPlayer).id).toBe(5);
  }));

  it('getSquareToPlayInMediumDifficultyLevel should return Square with id = [9]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, 'X', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, 'X', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let enableSquares: Square[] = squares.filter(square => !square.value);
    let currentPlayer: Player = new Player(1, 'X', true, difficultyNone);
    expect(service.getSquareToPlayInMediumDifficultyLevel(squares, enableSquares, winningCombinations, currentPlayer).id).toBe(9);
  }));

  it('getSquareToPlayInHardDifficultyLevel should return Square with id = [1]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, 'O', 'B1'));
    squares.push(new Square(3, 'O', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let enableSquares: Square[] = squares.filter(square => !square.value);
    let players: Player[] = [];
    players.push(new Player(1, 'X', true, difficultyNone));
    players.push(new Player(2, 'O', true, difficultyNone));
    let currentPlayer: Player = players[0];
    expect(service.getSquareToPlayInHardDifficultyLevel(squares, enableSquares, winningCombinations, currentPlayer, players).id).toBe(1);
  }));

  it('getSquareToPlayInHardDifficultyLevel should return Square with id = [7]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, 'O', 'B1'));
    squares.push(new Square(3, 'O', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, 'X', 'B3'));
    squares.push(new Square(9, 'X', 'C3'));
    let enableSquares: Square[] = squares.filter(square => !square.value);
    let players: Player[] = [];
    players.push(new Player(1, 'X', true, difficultyNone));
    players.push(new Player(2, 'O', true, difficultyNone));
    let currentPlayer: Player = players[0];
    expect(service.getSquareToPlayInHardDifficultyLevel(squares, enableSquares, winningCombinations, currentPlayer, players).id).toBe(7);
  }));

  it('isCornerSquare should return [true]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let square: Square = new Square(1, '', 'A1');
    expect(service.isCornerSquare(square)).toBe(true);
  }));

  it('isCornerSquare should return [false]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let square: Square = new Square(2, '', 'A2');
    expect(service.isCornerSquare(square)).toBe(false);
  }));

  it('isEdgeSquare should return [false]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let square: Square = new Square(1, '', 'A1');
    expect(service.isEdgeSquare(square)).toBe(false);
  }));

  it('isEdgeSquare should return [true]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let square: Square = new Square(2, '', 'A2');
    expect(service.isEdgeSquare(square)).toBe(true);
  }));

  it('getEnableEdgeSquareIndex should return [undefined]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, 'X', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, 'X', 'B2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, 'X', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, 'X', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    expect(service.getEnableEdgeSquareIndex(squares)).toBe(undefined);
  }));

  it('getEnableEdgeSquareIndex should return [1]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, 'X', 'B2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, 'X', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, 'X', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    expect(service.getEnableEdgeSquareIndex(squares)).toBe(1);
  }));

  it('getEnableEdgeSquareIndex should return [7]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, 'X', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, 'X', 'B2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, 'X', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    expect(service.getEnableEdgeSquareIndex(squares)).toBe(7);
  }));

  it('getEnableCornerSquareIndex should return [undefined]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, 'X', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, 'X', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, 'X', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, 'X', 'C3'));
    expect(service.getEnableCornerSquareIndex(squares)).toBe(undefined);
  }));

  it('getEnableCornerSquareIndex should return [0]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, 'X', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, 'X', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, 'X', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, 'X', 'C3'));
    expect(service.getEnableCornerSquareIndex(squares)).toBe(0);
  }));

  it('getEnableCornerSquareIndex should return [8]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, 'X', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, 'X', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, 'X', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    expect(service.getEnableCornerSquareIndex(squares)).toBe(8);
  }));

  it('hasOpponentPlayedCenterSquare should return [false]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    let currentPlayer: Player = new Player(2, 'O', true, difficultyVeryHard);
    expect(service.hasOpponentPlayedCenterSquare(squares, currentPlayer)).toBe(false);
  }));

  it('hasOpponentPlayedCenterSquare should return [false]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, 'O', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let currentPlayer: Player = new Player(2, 'O', true, difficultyVeryHard);
    expect(service.hasOpponentPlayedCenterSquare(squares, currentPlayer)).toBe(false);
  }));

  it('hasOpponentPlayedCenterSquare should return [true]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, 'X', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let currentPlayer: Player = new Player(2, 'O', true, difficultyVeryHard);
    expect(service.hasOpponentPlayedCenterSquare(squares, currentPlayer)).toBe(true);
  }));

  it('getOppositeSquareIndex should return [8]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    expect(service.getOppositeSquareIndex(squares, 0)).toBe(8);
  }));

  it('getOppositeSquareIndex should return [1]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    expect(service.getOppositeSquareIndex(squares, 7)).toBe(1);
  }));

  it('getEnableCornerSquareIndexOppositeToThePreviousPlayedCornerSquare should return [8]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    expect(service.getEnableCornerSquareIndexOppositeToThePreviousPlayedCornerSquare(squares)).toBe(8);
  }));

  it('getEnableCornerSquareIndexOppositeToThePreviousPlayedCornerSquare should return [2]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, 'O', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    expect(service.getEnableCornerSquareIndexOppositeToThePreviousPlayedCornerSquare(squares)).toBe(2);
  }));

  it('getEnableCornerSquareIndexOppositeToThePreviousPlayedCornerSquare should return [undefined]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, 'X', 'C3'));
    expect(service.getEnableCornerSquareIndexOppositeToThePreviousPlayedCornerSquare(squares)).toBe(undefined);
  }));

  it('getEnableAndIsolatedCornerSquareIndex should return [6]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, 'O', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    expect(service.getEnableAndIsolatedCornerSquareIndex(squares)).toBe(6);
  }));

  it('getEnableAndIsolatedCornerSquareIndex should return [2]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, 'O', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    expect(service.getEnableAndIsolatedCornerSquareIndex(squares)).toBe(2);
  }));

  it('getEnableAndIsolatedCornerSquareIndex should return [8]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, 'O', 'B1'));
    squares.push(new Square(3, 'X', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    expect(service.getEnableAndIsolatedCornerSquareIndex(squares)).toBe(8);
  }));

  it('getEnableAndIsolatedCornerSquareIndex should return [0]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, 'X', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, 'O', 'B3'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    expect(service.getEnableAndIsolatedCornerSquareIndex(squares)).toBe(0);
  }));

  it('getEnableAndIsolatedCornerSquareIndex should return [0]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, 'X', 'A3'));
    squares.push(new Square(8, 'O', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    expect(service.getEnableAndIsolatedCornerSquareIndex(squares)).toBe(0);
  }));

  it('getEnableAndIsolatedCornerSquareIndex should return [8]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, 'O', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, 'X', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    expect(service.getEnableAndIsolatedCornerSquareIndex(squares)).toBe(8);
  }));

  it('getEnableAndIsolatedCornerSquareIndex should return [2]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, 'O', 'B3'));
    squares.push(new Square(9, 'X', 'C3'));
    expect(service.getEnableAndIsolatedCornerSquareIndex(squares)).toBe(2);
  }));

  it('getEnableAndIsolatedCornerSquareIndex should return [6]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, 'O', 'B3'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, 'X', 'C3'));
    expect(service.getEnableAndIsolatedCornerSquareIndex(squares)).toBe(6);
  }));

  it('getEnableAndIsolatedCornerSquareIndex should return [2]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, 'O', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, 'X', 'C3'));
    expect(service.getEnableAndIsolatedCornerSquareIndex(squares)).toBe(2);
  }));

  it('getWinningPossibilitiesCount should return [0]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    let currentPlayer: Player = new Player(1, 'X', true, difficultyVeryHard);
    expect(service.getWinningPossibilitiesCount(squares, currentPlayer, winningCombinations)).toBe(0);
  }));

  it('getWinningPossibilitiesCount should return [1]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, 'X', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let currentPlayer: Player = new Player(1, 'X', true, difficultyVeryHard);
    expect(service.getWinningPossibilitiesCount(squares, currentPlayer, winningCombinations)).toBe(1);
  }));

  it('getWinningPossibilitiesCount should return [2]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, 'O', 'B1'));
    squares.push(new Square(3, 'X', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, 'X', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let currentPlayer: Player = new Player(1, 'X', true, difficultyVeryHard);
    expect(service.getWinningPossibilitiesCount(squares, currentPlayer, winningCombinations)).toBe(2);
  }));

  it('getEnableSquareIndexWithSeveralWinningPossibilities should return [undefined]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    let currentPlayer: Player = new Player(1, 'X', true, difficultyVeryHard);
    expect(service.getEnableSquareIndexWithSeveralWinningPossibilities(squares, currentPlayer, winningCombinations)).toBe(undefined);
  }));

  it('getEnableSquareIndexWithSeveralWinningPossibilities should return [4]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, 'X', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, 'O', 'B3'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, 'O', 'B3'));
    squares.push(new Square(9, 'X', 'C3'));
    let currentPlayer: Player = new Player(1, 'X', true, difficultyVeryHard);
    expect(service.getEnableSquareIndexWithSeveralWinningPossibilities(squares, currentPlayer, winningCombinations)).toBe(4);
  }));

  it('getEnableSquareIndexWithSeveralWinningPossibilities should return [6]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, '', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, 'X', 'B2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, 'X', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let currentPlayer: Player = new Player(1, 'X', true, difficultyVeryHard);
    expect(service.getEnableSquareIndexWithSeveralWinningPossibilities(squares, currentPlayer, winningCombinations)).toBe(6);
  }));

  it('getBestSquareIndexToPlay should return a corner square', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    let currentPlayer: Player = new Player(2, 'O', true, difficultyVeryHard);
    let bestSquareIndexToPlay: number = service.getBestSquareIndexToPlay(squares, currentPlayer, winningCombinations);
    let isCornerSquare: boolean = service.isCornerSquare(squares[bestSquareIndexToPlay]);
    expect(isCornerSquare).toBe(true);
  }));

  it('getBestSquareIndexToPlay should return [4]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, '', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let currentPlayer: Player = new Player(2, 'O', true, difficultyVeryHard);
    expect(service.getBestSquareIndexToPlay(squares, currentPlayer, winningCombinations)).toBe(4);
  }));

  it('getBestSquareIndexToPlay should return [8]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'O', 'A1'));
    squares.push(new Square(2, '', 'B1'));
    squares.push(new Square(3, '', 'C1'));
    squares.push(new Square(4, '', 'A2'));
    squares.push(new Square(5, 'X', 'B2'));
    squares.push(new Square(6, '', 'C2'));
    squares.push(new Square(7, '', 'A3'));
    squares.push(new Square(8, '', 'B3'));
    squares.push(new Square(9, '', 'C3'));
    let currentPlayer: Player = new Player(2, 'O', true, difficultyVeryHard);
    expect(service.getBestSquareIndexToPlay(squares, currentPlayer, winningCombinations)).toBe(8);
  }));

  it('getSimilarGames should return [0] element', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let historyGamesMoves: Move[][] = [];
    let currentGameMoves: Move[] = [];
    expect(service.getSimilarGames(historyGamesMoves, currentGameMoves).length).toBe(0);
  }));

  it('getSimilarGames should return [1] element', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let historyGamesMoves: Move[][] = [];
    let moves: Move[] = [];
    moves.push(new Move('O', 1, false));
    moves.push(new Move('X', 2, false));
    moves.push(new Move('O', 4, false));
    moves.push(new Move('X', 5, false));
    moves.push(new Move('O', 7, true));
    historyGamesMoves.push(moves);
    let currentGameMoves: Move[] = [];
    expect(service.getSimilarGames(historyGamesMoves, currentGameMoves).length).toBe(1);
  }));

  it('getSimilarGames should return [0] element', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let historyGamesMoves: Move[][] = [];
    let moves: Move[] = [];
    historyGamesMoves.push(moves);
    let currentGameMoves: Move[] = [];
    currentGameMoves.push(new Move('O', 1, false));
    currentGameMoves.push(new Move('X', 2, false));
    currentGameMoves.push(new Move('O', 4, false));
    currentGameMoves.push(new Move('X', 5, false));
    expect(service.getSimilarGames(historyGamesMoves, currentGameMoves).length).toBe(0);
  }));

  it('getSimilarGames should return [1] element', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let historyGamesMoves: Move[][] = [];
    let moves: Move[] = [];
    moves.push(new Move('O', 1, false));
    moves.push(new Move('X', 2, false));
    moves.push(new Move('O', 4, false));
    moves.push(new Move('X', 5, false));
    moves.push(new Move('O', 7, true));
    historyGamesMoves.push(moves);
    let currentGameMoves: Move[] = [];
    currentGameMoves.push(new Move('O', 1, false));
    currentGameMoves.push(new Move('X', 2, false));
    currentGameMoves.push(new Move('O', 4, false));
    currentGameMoves.push(new Move('X', 5, false));
    expect(service.getSimilarGames(historyGamesMoves, currentGameMoves).length).toBe(1);
  }));

  it('getMostProbableWinningSquareIndex should return [undefined]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let historyGamesMoves: Move[][] = [];
    let currentGameMoves: Move[] = [];
    expect(service.getMostProbableWinningSquareIndex(historyGamesMoves, currentGameMoves)).toBe(undefined);
  }));

  it('getMostProbableWinningSquareIndex should return [6]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let historyGamesMoves: Move[][] = [];
    let moves: Move[] = [];
    moves.push(new Move('O', 1, false));
    moves.push(new Move('X', 2, false));
    moves.push(new Move('O', 4, false));
    moves.push(new Move('X', 5, false));
    moves.push(new Move('O', 7, true));
    historyGamesMoves.push(moves);
    let currentGameMoves: Move[] = [];
    currentGameMoves.push(new Move('O', 1, false));
    currentGameMoves.push(new Move('X', 2, false));
    currentGameMoves.push(new Move('O', 4, false));
    currentGameMoves.push(new Move('X', 5, false));
    expect(service.getMostProbableWinningSquareIndex(historyGamesMoves, currentGameMoves)).toBe(6);
  }));

  it('willBeWinningGame should return [true]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let lastMoveDoneIndex: number = -1;
    let moves: Move[] = [];
    moves.push(new Move('O', 1, false));
    moves.push(new Move('X', 2, false));
    moves.push(new Move('O', 4, false));
    moves.push(new Move('X', 5, false));
    moves.push(new Move('O', 7, true));
    expect(service.willBeWinningGame(moves, lastMoveDoneIndex)).toBe(true);
  }));

  it('willBeWinningGame should return [false]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let lastMoveDoneIndex: number = 0;
    let moves: Move[] = [];
    moves.push(new Move('O', 1, false));
    moves.push(new Move('X', 2, false));
    moves.push(new Move('O', 4, false));
    moves.push(new Move('X', 5, false));
    moves.push(new Move('O', 7, true));
    expect(service.willBeWinningGame(moves, lastMoveDoneIndex)).toBe(false);
  }));

  it('willBeWinningGame should return [true]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let lastMoveDoneIndex: number = 3;
    let moves: Move[] = [];
    moves.push(new Move('O', 1, false));
    moves.push(new Move('X', 2, false));
    moves.push(new Move('O', 4, false));
    moves.push(new Move('X', 5, false));
    moves.push(new Move('O', 7, true));
    expect(service.willBeWinningGame(moves, lastMoveDoneIndex)).toBe(true);
  }));

  it('willBeLosingGame should return [true]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let lastMoveDoneIndex: number = 0;
    let moves: Move[] = [];
    moves.push(new Move('O', 1, false));
    moves.push(new Move('X', 2, false));
    moves.push(new Move('O', 4, false));
    moves.push(new Move('X', 5, false));
    moves.push(new Move('O', 7, true));
    expect(service.willBeLosingGame(moves, lastMoveDoneIndex)).toBe(true);
  }));

  it('willBeLosingGame should return [false]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let lastMoveDoneIndex: number = 1;
    let moves: Move[] = [];
    moves.push(new Move('O', 1, false));
    moves.push(new Move('X', 2, false));
    moves.push(new Move('O', 4, false));
    moves.push(new Move('X', 5, false));
    moves.push(new Move('O', 7, true));
    expect(service.willBeLosingGame(moves, lastMoveDoneIndex)).toBe(false);
  }));

  it('willBeLosingGame should return [true]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let lastMoveDoneIndex: number = 2;
    let moves: Move[] = [];
    moves.push(new Move('O', 1, false));
    moves.push(new Move('X', 2, false));
    moves.push(new Move('O', 4, false));
    moves.push(new Move('X', 5, false));
    moves.push(new Move('O', 7, true));
    expect(service.willBeLosingGame(moves, lastMoveDoneIndex)).toBe(true);
  }));

  it('sortByWinningGameCountDescThenByLosingGameCountAsc should return [true]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squareStatistics: SquareStatistic[] = [];
    let gameCount: number = 10;
    squareStatistics.push(new SquareStatistic(0, 0, 0, gameCount));
    squareStatistics.push(new SquareStatistic(1, 5, 0, gameCount));
    squareStatistics.push(new SquareStatistic(2, 3, 4, gameCount));
    squareStatistics.push(new SquareStatistic(3, 3, 0, gameCount));
    squareStatistics.push(new SquareStatistic(4, 0, 10, gameCount));
    squareStatistics.push(new SquareStatistic(5, 0, 9, gameCount));
    squareStatistics = service.sortByWinningGameCountDescThenByLosingGameCountAsc(squareStatistics);
    let expectedOrderedSquaredIds: number[] = [1, 3, 2, 0, 5, 4];
    let areOrderedAsExpected: boolean = false;
    if (squareStatistics[0].squareId == expectedOrderedSquaredIds[0]
      && squareStatistics[1].squareId == expectedOrderedSquaredIds[1]
      && squareStatistics[2].squareId == expectedOrderedSquaredIds[2]
      && squareStatistics[3].squareId == expectedOrderedSquaredIds[3]
      && squareStatistics[4].squareId == expectedOrderedSquaredIds[4]
      && squareStatistics[5].squareId == expectedOrderedSquaredIds[5]) {
      areOrderedAsExpected = true;
    }
    expect(areOrderedAsExpected).toBe(true);
  }));

  it('getMostProbableWinningSquareId should return [7]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let similarGames: Move[][] = [];
    let moves: Move[] = [];
    moves.push(new Move('O', 1, false));
    moves.push(new Move('X', 2, false));
    moves.push(new Move('O', 4, false));
    moves.push(new Move('X', 5, false));
    moves.push(new Move('O', 7, true));
    similarGames.push(moves);
    let currentGameMoves: Move[] = [];
    currentGameMoves.push(new Move('O', 1, false));
    currentGameMoves.push(new Move('X', 2, false));
    currentGameMoves.push(new Move('O', 4, false));
    currentGameMoves.push(new Move('X', 5, false));
    expect(service.getMostProbableWinningSquareId(similarGames, currentGameMoves)).toBe(7);
  }));

  it('getMostProbableWinningSquareId should return [4]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let similarGames: Move[][] = [];
    let moves: Move[] = [];
    moves.push(new Move('O', 1, false));
    moves.push(new Move('X', 2, false));
    moves.push(new Move('O', 4, false));
    moves.push(new Move('X', 5, false));
    moves.push(new Move('O', 7, true));
    similarGames.push(moves);
    let currentGameMoves: Move[] = [];
    currentGameMoves.push(new Move('O', 1, false));
    currentGameMoves.push(new Move('X', 2, false));
    expect(service.getMostProbableWinningSquareId(similarGames, currentGameMoves)).toBe(4);
  }));

  it('getMostProbableWinningSquareId should return [5]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let similarGames: Move[][] = [];
    let moves: Move[] = [];
    moves.push(new Move('O', 1, false));
    moves.push(new Move('X', 2, false));
    moves.push(new Move('O', 4, false));
    moves.push(new Move('X', 5, false));
    moves.push(new Move('O', 7, true));
    let moves2: Move[] = [];
    moves2.push(new Move('O', 1, false));
    moves2.push(new Move('X', 2, false));
    moves2.push(new Move('O', 5, false));
    moves2.push(new Move('X', 4, false));
    moves2.push(new Move('O', 9, true));
    let moves3: Move[] = [];
    moves3.push(new Move('O', 1, false));
    moves3.push(new Move('X', 2, false));
    moves3.push(new Move('O', 5, false));
    moves3.push(new Move('X', 4, false));
    moves3.push(new Move('O', 9, true));
    let moves4: Move[] = [];
    moves4.push(new Move('O', 1, false));
    moves4.push(new Move('X', 2, false));
    moves4.push(new Move('O', 4, false));
    moves4.push(new Move('X', 5, false));
    moves4.push(new Move('O', 8, false));
    similarGames.push(moves);
    similarGames.push(moves2);
    similarGames.push(moves3);
    similarGames.push(moves4);
    let currentGameMoves: Move[] = [];
    currentGameMoves.push(new Move('O', 1, false));
    currentGameMoves.push(new Move('X', 2, false));
    expect(service.getMostProbableWinningSquareId(similarGames, currentGameMoves)).toBe(5);
  }));

  it('getMostProbableWinningSquareId should return [true] for squareId != 6', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let similarGames: Move[][] = [];
    let moves: Move[] = [];
    moves.push(new Move('O', 1, false));
    moves.push(new Move('X', 2, false));
    moves.push(new Move('O', 4, false));
    moves.push(new Move('X', 5, false));
    moves.push(new Move('O', 3, false));
    moves.push(new Move('X', 6, false));
    moves.push(new Move('O', 8, false));
    moves.push(new Move('X', 7, false));
    moves.push(new Move('O', 9, false));
    similarGames.push(moves);
    let currentGameMoves: Move[] = [];
    currentGameMoves.push(new Move('O', 1, false));
    currentGameMoves.push(new Move('X', 2, false));
    currentGameMoves.push(new Move('O', 4, false));
    currentGameMoves.push(new Move('X', 5, false));
    currentGameMoves.push(new Move('O', 6, false));
    currentGameMoves.push(new Move('X', 8, true));
    let mostProbableWinningSquareId: number = service.getMostProbableWinningSquareId(similarGames, currentGameMoves);
    let hasNotPlayedAtSquareIdSix: boolean = mostProbableWinningSquareId != 6;
    expect(hasNotPlayedAtSquareIdSix).toBe(true);
  }));

  it('getMostProbableWinningSquareId should have a result when next moveToRead is undefined', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let similarGames: Move[][] = [];
    let moves: Move[] = [];
    moves.push(new Move('O', 1, false));
    let moves2: Move[] = [];
    moves2.push(new Move('O', 1, false));
    moves2.push(new Move('X', 2, false));
    moves2.push(new Move('O', 5, false));
    moves2.push(new Move('X', 4, false));
    moves2.push(new Move('O', 9, true));
    similarGames.push(moves);
    similarGames.push(moves2);
    let currentGameMoves: Move[] = [];
    currentGameMoves.push(new Move('O', 1, false));
    let mostProbableWinningSquareId: number = service.getMostProbableWinningSquareId(similarGames, currentGameMoves);
    let hasResult: boolean = mostProbableWinningSquareId != null;
    expect(hasResult).toBe(true);
  }));

  it('getMostProbableWinningSquareId should return [undefined] when next moveToRead is undefined', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let similarGames: Move[][] = [];
    let moves: Move[] = [];
    moves.push(new Move('O', 1, false));
    similarGames.push(moves);
    let currentGameMoves: Move[] = [];
    currentGameMoves.push(new Move('O', 1, false));
    expect(service.getMostProbableWinningSquareId(similarGames, currentGameMoves)).toBe(undefined);
  }));
});
