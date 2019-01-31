import { TestBed } from '@angular/core/testing';

import { DragAndDropTypeService } from './drag-and-drop-type.service';

describe('DragAndDropTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DragAndDropTypeService = TestBed.get(DragAndDropTypeService);
    expect(service).toBeTruthy();
  });
});
