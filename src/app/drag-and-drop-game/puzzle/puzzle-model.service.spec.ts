import { TestBed, inject } from '@angular/core/testing';

import { PuzzleModelService } from './puzzle-model.service';
import { PuzzleModel } from './puzzle-model';

describe('PuzzleModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PuzzleModelService = TestBed.get(PuzzleModelService);
    expect(service).toBeTruthy();
  });

  it('getPortionWith should return [100]', inject([PuzzleModelService], (service: PuzzleModelService) => {
    let puzzleModel: PuzzleModel = new PuzzleModel(0, 'Puzzle name', 'imageLocation', 500, 300, 5, 2);
    expect(service.getPortionWith(puzzleModel)).toBe(100);
  }));

  it('getPortionWith should return [167]', inject([PuzzleModelService], (service: PuzzleModelService) => {
    let puzzleModel: PuzzleModel = new PuzzleModel(0, 'Puzzle name', 'imageLocation', 500, 300, 3, 2);
    expect(service.getPortionWith(puzzleModel)).toBe(167);
  }));

  it('getPortionWith should return [150]', inject([PuzzleModelService], (service: PuzzleModelService) => {
    let puzzleModel: PuzzleModel = new PuzzleModel(0, 'Puzzle name', 'imageLocation', 500, 300, 5, 2);
    expect(service.getPortionHeight(puzzleModel)).toBe(150);
  }));

  it('getPortionWith should return [43]', inject([PuzzleModelService], (service: PuzzleModelService) => {
    let puzzleModel: PuzzleModel = new PuzzleModel(0, 'Puzzle name', 'imageLocation', 500, 330, 5, 7);
    expect(service.getPortionHeight(puzzleModel)).toBe(47);
  }));
});
