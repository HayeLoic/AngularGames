import { TestBed } from '@angular/core/testing';

import { PuzzlePortionService } from './puzzle-portion.service';

describe('PuzzlePortionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PuzzlePortionService = TestBed.get(PuzzlePortionService);
    expect(service).toBeTruthy();
  });
});
