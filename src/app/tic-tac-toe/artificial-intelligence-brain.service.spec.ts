import { TestBed, inject } from '@angular/core/testing';

import { ArtificialIntelligenceBrainService } from './artificial-intelligence-brain.service';

describe('ArtificialIntelligenceBrainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArtificialIntelligenceBrainService]
    });
  });

  it('should be created', inject([ArtificialIntelligenceBrainService], (service: ArtificialIntelligenceBrainService) => {
    expect(service).toBeTruthy();
  }));
});
