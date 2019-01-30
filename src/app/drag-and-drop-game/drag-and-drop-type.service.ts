import { Injectable } from '@angular/core';
import { DragAndDropType } from './drag-and-drop-type';

@Injectable({
  providedIn: 'root'
})
export class DragAndDropTypeService {

  constructor() { }

  getDragAndDropTypes(): DragAndDropType[] {
    let dragAndDropTypes: DragAndDropType[] = [];
    dragAndDropTypes.push(new DragAndDropType('basic', 'Basique'));
    dragAndDropTypes.push(new DragAndDropType('v-h', 'Vertical - horizontal'));
    return dragAndDropTypes;
  }
}
