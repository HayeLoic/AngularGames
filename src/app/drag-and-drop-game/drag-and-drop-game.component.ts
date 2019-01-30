import { Component, OnInit } from '@angular/core';
import { DragAndDropType } from './drag-and-drop-type';
import { DragAndDropTypeService } from './drag-and-drop-type.service';

@Component({
  selector: 'app-drag-and-drop-game',
  templateUrl: './drag-and-drop-game.component.html',
  styleUrls: ['./drag-and-drop-game.component.css']
})
export class DragAndDropGameComponent implements OnInit {
  dragAndDropTypes: DragAndDropType[] = [];
  selectedDragAndDropType: DragAndDropType;

  constructor(private dragAndDropTypeService: DragAndDropTypeService) { }

  ngOnInit() {
    this.dragAndDropTypes = this.dragAndDropTypeService.getDragAndDropTypes();
  }

  isSelectedDragAndDropType(code: string): boolean {
    if (this.selectedDragAndDropType && this.selectedDragAndDropType.code == code) {
      return true;
    } else {
      return false;
    }
  }
}