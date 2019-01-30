import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';

import { TicTacToeComponent } from './tic-tac-toe.component';
import { SquareComponent } from './square/square.component';

describe('TicTacToeComponent', () => {
  let component: TicTacToeComponent;
  let fixture: ComponentFixture<TicTacToeComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TicTacToeComponent, SquareComponent],
      imports: [FormsModule, UiSwitchModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicTacToeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
