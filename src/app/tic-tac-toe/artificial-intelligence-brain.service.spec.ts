import { TestBed, inject } from '@angular/core/testing';

import { ArtificialIntelligenceBrainService } from './artificial-intelligence-brain.service';
import { Square } from './square';
import { Player } from './player';
import { DifficultyLevel } from '../difficulty/difficulty-level';

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
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
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
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
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
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
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
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let player: Player = new Player(1, 'X', true, DifficultyLevel.None);
    expect(service.getWinningSquareIndex(squares, winningCombinations, player)).toBe(undefined);
  }));

  it('getWinningSquareIndex should return [2]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, 'X'));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let player: Player = new Player(1, 'X', true, DifficultyLevel.None);
    expect(service.getWinningSquareIndex(squares, winningCombinations, player)).toBe(2);
  }));

  it('getWinningSquareIndex should return [4]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, 'X'));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, 'X'));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let player: Player = new Player(1, 'X', true, DifficultyLevel.None);
    expect(service.getWinningSquareIndex(squares, winningCombinations, player)).toBe(4);
  }));

  it('getWinningSquareIndex should return [4]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, 'X'));
    squares.push(new Square(9, 'X'));
    let player: Player = new Player(1, 'X', true, DifficultyLevel.None);
    expect(service.getWinningSquareIndex(squares, winningCombinations, player)).toBe(6);
  }));

  it('getOpponentWinningSquareIndex should return [undefined]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    let players: Player[] = [];
    players.push(new Player(1, 'X', true, DifficultyLevel.None));
    players.push(new Player(2, 'O', true, DifficultyLevel.None));
    let currentPlayer: Player = players[0];
    expect(service.getOpponentWinningSquareIndex(squares, winningCombinations, currentPlayer, players)).toBe(undefined);
  }));

  it('getOpponentWinningSquareIndex should return [2]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'O'));
    squares.push(new Square(2, 'O'));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let players: Player[] = [];
    players.push(new Player(1, 'X', true, DifficultyLevel.None));
    players.push(new Player(2, 'O', true, DifficultyLevel.None));
    let currentPlayer: Player = players[0];
    expect(service.getOpponentWinningSquareIndex(squares, winningCombinations, currentPlayer, players)).toBe(2);
  }));

  it('getOpponentWinningSquareIndex should return [undefined]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, 'X'));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let players: Player[] = [];
    players.push(new Player(1, 'X', true, DifficultyLevel.None));
    players.push(new Player(2, 'O', true, DifficultyLevel.None));
    let currentPlayer: Player = players[0];
    expect(service.getOpponentWinningSquareIndex(squares, winningCombinations, currentPlayer, players)).toBe(undefined);
  }));

  it('getOpponentWinningSquareIndex should return [8]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, 'X'));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, 'V'));
    squares.push(new Square(8, 'V'));
    squares.push(new Square(9, ''));
    let players: Player[] = [];
    players.push(new Player(1, 'X', true, DifficultyLevel.None));
    players.push(new Player(2, 'O', true, DifficultyLevel.None));
    players.push(new Player(3, 'V', true, DifficultyLevel.None));
    let currentPlayer: Player = players[0];
    expect(service.getOpponentWinningSquareIndex(squares, winningCombinations, currentPlayer, players)).toBe(8);
  }));

  it('getOpponentWinningSquareIndex should return [5]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, 'X'));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, 'O'));
    squares.push(new Square(5, 'O'));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, 'V'));
    squares.push(new Square(8, 'V'));
    squares.push(new Square(9, ''));
    let players: Player[] = [];
    players.push(new Player(1, 'X', true, DifficultyLevel.None));
    players.push(new Player(2, 'O', true, DifficultyLevel.None));
    players.push(new Player(3, 'V', true, DifficultyLevel.None));
    let currentPlayer: Player = players[0];
    expect(service.getOpponentWinningSquareIndex(squares, winningCombinations, currentPlayer, players)).toBe(5);
  }));

  it('getSquareToPlayInEasyDifficultyLevel should return each possible square [9]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    squares.push(new Square(1, ''));
    squares.push(new Square(2, 'X'));
    squares.push(new Square(3, 'X'));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let enableSquares: Square[] = squares.filter(square => !square.value);
    let currentPlayer: Player = new Player(1, 'X', true, DifficultyLevel.None);
    expect(service.getSquareToPlayInMediumDifficultyLevel(squares, enableSquares, winningCombinations, currentPlayer).id).toBe(1);
  }));

  it('getSquareToPlayInMediumDifficultyLevel should return Square with id = [5]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, 'X'));
    let enableSquares: Square[] = squares.filter(square => !square.value);
    let currentPlayer: Player = new Player(1, 'X', true, DifficultyLevel.None);
    expect(service.getSquareToPlayInMediumDifficultyLevel(squares, enableSquares, winningCombinations, currentPlayer).id).toBe(5);
  }));

  it('getSquareToPlayInMediumDifficultyLevel should return Square with id = [9]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, 'X'));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, 'X'));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let enableSquares: Square[] = squares.filter(square => !square.value);
    let currentPlayer: Player = new Player(1, 'X', true, DifficultyLevel.None);
    expect(service.getSquareToPlayInMediumDifficultyLevel(squares, enableSquares, winningCombinations, currentPlayer).id).toBe(9);
  }));

  it('getSquareToPlayInHardDifficultyLevel should return Square with id = [1]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, 'O'));
    squares.push(new Square(3, 'O'));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let enableSquares: Square[] = squares.filter(square => !square.value);
    let players: Player[] = [];
    players.push(new Player(1, 'X', true, DifficultyLevel.None));
    players.push(new Player(2, 'O', true, DifficultyLevel.None));
    let currentPlayer: Player = players[0];
    expect(service.getSquareToPlayInHardDifficultyLevel(squares, enableSquares, winningCombinations, currentPlayer, players).id).toBe(1);
  }));

  it('getSquareToPlayInHardDifficultyLevel should return Square with id = [7]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, 'O'));
    squares.push(new Square(3, 'O'));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, 'X'));
    squares.push(new Square(9, 'X'));
    let enableSquares: Square[] = squares.filter(square => !square.value);
    let players: Player[] = [];
    players.push(new Player(1, 'X', true, DifficultyLevel.None));
    players.push(new Player(2, 'O', true, DifficultyLevel.None));
    let currentPlayer: Player = players[0];
    expect(service.getSquareToPlayInHardDifficultyLevel(squares, enableSquares, winningCombinations, currentPlayer, players).id).toBe(7);
  }));

  it('isCornerSquare should return [true]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let square: Square = new Square(1, '');
    expect(service.isCornerSquare(square)).toBe(true);
  }));

  it('isCornerSquare should return [false]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let square: Square = new Square(2, '');
    expect(service.isCornerSquare(square)).toBe(false);
  }));

  it('isEdgeSquare should return [false]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let square: Square = new Square(1, '');
    expect(service.isEdgeSquare(square)).toBe(false);
  }));

  it('isEdgeSquare should return [true]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let square: Square = new Square(2, '');
    expect(service.isEdgeSquare(square)).toBe(true);
  }));

  it('getEnableEdgeSquareIndex should return [undefined]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, 'X'));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, 'X'));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, 'X'));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, 'X'));
    squares.push(new Square(9, ''));
    expect(service.getEnableEdgeSquareIndex(squares)).toBe(undefined);
  }));

  it('getEnableEdgeSquareIndex should return [1]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, 'X'));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, 'X'));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, 'X'));
    squares.push(new Square(9, ''));
    expect(service.getEnableEdgeSquareIndex(squares)).toBe(1);
  }));

  it('getEnableEdgeSquareIndex should return [7]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, 'X'));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, 'X'));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, 'X'));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    expect(service.getEnableEdgeSquareIndex(squares)).toBe(7);
  }));

  it('getEnableCornerSquareIndex should return [undefined]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, 'X'));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, 'X'));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, 'X'));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, 'X'));
    expect(service.getEnableCornerSquareIndex(squares)).toBe(undefined);
  }));

  it('getEnableCornerSquareIndex should return [0]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, 'X'));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, 'X'));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, 'X'));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, 'X'));
    expect(service.getEnableCornerSquareIndex(squares)).toBe(0);
  }));

  it('getEnableCornerSquareIndex should return [8]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, 'X'));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, 'X'));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, 'X'));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    expect(service.getEnableCornerSquareIndex(squares)).toBe(8);
  }));

  it('hasOpponentPlayedCenterSquare should return [false]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    let currentPlayer: Player = new Player(2, 'O', true, DifficultyLevel.VeryHard);
    expect(service.hasOpponentPlayedCenterSquare(squares, currentPlayer)).toBe(false);
  }));

  it('hasOpponentPlayedCenterSquare should return [false]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, 'O'));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let currentPlayer: Player = new Player(2, 'O', true, DifficultyLevel.VeryHard);
    expect(service.hasOpponentPlayedCenterSquare(squares, currentPlayer)).toBe(false);
  }));

  it('hasOpponentPlayedCenterSquare should return [true]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, 'X'));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let currentPlayer: Player = new Player(2, 'O', true, DifficultyLevel.VeryHard);
    expect(service.hasOpponentPlayedCenterSquare(squares, currentPlayer)).toBe(true);
  }));
  
  it('getOppositeSquareIndex should return [8]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    expect(service.getOppositeSquareIndex(squares, 0)).toBe(8);
  }));
  
  it('getOppositeSquareIndex should return [1]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    expect(service.getOppositeSquareIndex(squares, 7)).toBe(1);
  }));

  it('getEnableCornerSquareIndexOppositeToThePreviousPlayedCornerSquare should return [8]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    expect(service.getEnableCornerSquareIndexOppositeToThePreviousPlayedCornerSquare(squares)).toBe(8);
  }));

  it('getEnableCornerSquareIndexOppositeToThePreviousPlayedCornerSquare should return [2]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, 'O'));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    expect(service.getEnableCornerSquareIndexOppositeToThePreviousPlayedCornerSquare(squares)).toBe(2);
  }));

  it('getEnableCornerSquareIndexOppositeToThePreviousPlayedCornerSquare should return [undefined]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, 'X'));
    expect(service.getEnableCornerSquareIndexOppositeToThePreviousPlayedCornerSquare(squares)).toBe(undefined);
  }));

  it('getEnableAndIsolatedCornerSquareIndex should return [6]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, 'O'));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    expect(service.getEnableAndIsolatedCornerSquareIndex(squares)).toBe(6);
  }));

  it('getEnableAndIsolatedCornerSquareIndex should return [2]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, 'O'));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    expect(service.getEnableAndIsolatedCornerSquareIndex(squares)).toBe(2);
  }));

  it('getEnableAndIsolatedCornerSquareIndex should return [8]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, 'O'));
    squares.push(new Square(3, 'X'));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    expect(service.getEnableAndIsolatedCornerSquareIndex(squares)).toBe(8);
  }));

  it('getEnableAndIsolatedCornerSquareIndex should return [0]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, 'X'));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, 'O'));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    expect(service.getEnableAndIsolatedCornerSquareIndex(squares)).toBe(0);
  }));

  it('getEnableAndIsolatedCornerSquareIndex should return [0]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, 'X'));
    squares.push(new Square(8, 'O'));
    squares.push(new Square(9, ''));
    expect(service.getEnableAndIsolatedCornerSquareIndex(squares)).toBe(0);
  }));

  it('getEnableAndIsolatedCornerSquareIndex should return [8]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, 'O'));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, 'X'));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    expect(service.getEnableAndIsolatedCornerSquareIndex(squares)).toBe(8);
  }));

  it('getEnableAndIsolatedCornerSquareIndex should return [2]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, 'O'));
    squares.push(new Square(9, 'X'));
    expect(service.getEnableAndIsolatedCornerSquareIndex(squares)).toBe(2);
  }));

  it('getEnableAndIsolatedCornerSquareIndex should return [6]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, 'O'));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, 'X'));
    expect(service.getEnableAndIsolatedCornerSquareIndex(squares)).toBe(6);
  }));

  it('getEnableAndIsolatedCornerSquareIndex should return [2]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, 'O'));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, 'X'));
    expect(service.getEnableAndIsolatedCornerSquareIndex(squares)).toBe(2);
  }));

  it('getWinningPossibilitiesCount should return [0]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    let currentPlayer: Player = new Player(1, 'X', true, DifficultyLevel.VeryHard);
    expect(service.getWinningPossibilitiesCount(squares, currentPlayer, winningCombinations)).toBe(0);
  }));

  it('getWinningPossibilitiesCount should return [1]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, 'X'));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let currentPlayer: Player = new Player(1, 'X', true, DifficultyLevel.VeryHard);
    expect(service.getWinningPossibilitiesCount(squares, currentPlayer, winningCombinations)).toBe(1);
  }));

  it('getWinningPossibilitiesCount should return [2]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, 'O'));
    squares.push(new Square(3, 'X'));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, 'X'));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let currentPlayer: Player = new Player(1, 'X', true, DifficultyLevel.VeryHard);
    expect(service.getWinningPossibilitiesCount(squares, currentPlayer, winningCombinations)).toBe(2);
  }));

  it('getEnableSquareIndexWithSeveralWinningPossibilities should return [undefined]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    let currentPlayer: Player = new Player(1, 'X', true, DifficultyLevel.VeryHard);
    expect(service.getEnableSquareIndexWithSeveralWinningPossibilities(squares, currentPlayer, winningCombinations)).toBe(undefined);
  }));
  
  it('getEnableSquareIndexWithSeveralWinningPossibilities should return [4]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, 'X'));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, 'O'));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, 'O'));
    squares.push(new Square(9, 'X'));
    let currentPlayer: Player = new Player(1, 'X', true, DifficultyLevel.VeryHard);
    expect(service.getEnableSquareIndexWithSeveralWinningPossibilities(squares, currentPlayer, winningCombinations)).toBe(4);
  }));
  
  it('getEnableSquareIndexWithSeveralWinningPossibilities should return [6]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, ''));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, 'X'));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, 'X'));
    squares.push(new Square(9, ''));
    let currentPlayer: Player = new Player(1, 'X', true, DifficultyLevel.VeryHard);
    expect(service.getEnableSquareIndexWithSeveralWinningPossibilities(squares, currentPlayer, winningCombinations)).toBe(6);
  }));

  it('getBestSquareIndexToPlay should return a corner square', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
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
    let currentPlayer: Player = new Player(2, 'O', true, DifficultyLevel.VeryHard);
    let bestSquareIndexToPlay: number = service.getBestSquareIndexToPlay(squares, currentPlayer, winningCombinations);
    let isCornerSquare: boolean = service.isCornerSquare(squares[bestSquareIndexToPlay]);
    expect(isCornerSquare).toBe(true);
  }));

  it('getBestSquareIndexToPlay should return [4]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'X'));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, ''));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let currentPlayer: Player = new Player(2, 'O', true, DifficultyLevel.VeryHard);
    expect(service.getBestSquareIndexToPlay(squares, currentPlayer, winningCombinations)).toBe(4);
  }));

  it('getBestSquareIndexToPlay should return [8]', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    let squares: Square[] = [];
    squares.push(new Square(1, 'O'));
    squares.push(new Square(2, ''));
    squares.push(new Square(3, ''));
    squares.push(new Square(4, ''));
    squares.push(new Square(5, 'X'));
    squares.push(new Square(6, ''));
    squares.push(new Square(7, ''));
    squares.push(new Square(8, ''));
    squares.push(new Square(9, ''));
    let currentPlayer: Player = new Player(2, 'O', true, DifficultyLevel.VeryHard);
    expect(service.getBestSquareIndexToPlay(squares, currentPlayer, winningCombinations)).toBe(8);
  }));
});
