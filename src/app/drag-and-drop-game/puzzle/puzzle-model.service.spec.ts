import { TestBed } from '@angular/core/testing';

import { PuzzleModelService } from './puzzle-model.service';

describe('PuzzleModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PuzzleModelService = TestBed.get(PuzzleModelService);
    expect(service).toBeTruthy();
  });
});
