import { Component, OnInit } from '@angular/core';
import { DragAndDropType } from './drag-and-drop-type';
import { DragAndDropTypeService } from './drag-and-drop-type.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-and-drop-game',
  templateUrl: './drag-and-drop-game.component.html',
  styleUrls: ['./drag-and-drop-game.component.css']
})
export class DragAndDropGameComponent implements OnInit {
  dragAndDropTypes: DragAndDropType[] = [];
  selectedDragAndDropType: DragAndDropType;
  todos: string[] = [
    'Passer l\'aspirateur',
    'Passer la serpillière',
    'Faire la poussière',
    'Réparer la fuite du robinet',
    'Faire le repassage',
    'Faire la vaisselle'];
  dones: string[] = [
    'Faire les courses']

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

  listDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  connectedDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}