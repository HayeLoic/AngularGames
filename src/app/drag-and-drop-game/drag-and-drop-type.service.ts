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
    dragAndDropTypes.push(new DragAndDropType('list', 'Liste ordonnée'));
    dragAndDropTypes.push(new DragAndDropType('modal', 'Modale déplaçable'));
    dragAndDropTypes.push(new DragAndDropType('handle', 'Déplacement par la poignée'));
    dragAndDropTypes.push(new DragAndDropType('connected', 'Transfert d\'éléments entre 2 listes'));
    return dragAndDropTypes;
  }
}
