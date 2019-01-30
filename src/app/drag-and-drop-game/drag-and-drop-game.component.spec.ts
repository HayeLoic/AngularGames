import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropGameComponent } from './drag-and-drop-game.component';

describe('DragAndDropGameComponent', () => {
  let component: DragAndDropGameComponent;
  let fixture: ComponentFixture<DragAndDropGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragAndDropGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
