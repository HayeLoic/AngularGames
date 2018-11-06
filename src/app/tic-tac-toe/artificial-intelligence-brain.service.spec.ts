import { async, TestBed, inject } from '@angular/core/testing';

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
});
