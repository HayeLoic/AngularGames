import { Component, OnInit } from '@angular/core';
import { DragAndDropType } from './drag-and-drop-type/drag-and-drop-type';
import { DragAndDropTypeService } from './drag-and-drop-type/drag-and-drop-type.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PuzzlePortion } from './puzzle/puzzle-portion';
import { PuzzlePortionService } from './puzzle/puzzle-portion.service';
import { PuzzleModel } from './puzzle/puzzle-model';
import { PuzzleModelService } from './puzzle/puzzle-model.service';

@Component({
  selector: 'app-drag-and-drop-game',
  templateUrl: './drag-and-drop-game.component.html',
  styleUrls: ['./drag-and-drop-game.component.css']
})
export class DragAndDropGameComponent implements OnInit {
  puzzlePortions: PuzzlePortion[] = [];
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
    'Faire les courses'];
  puzzleModel: PuzzleModel;

  constructor(private dragAndDropTypeService: DragAndDropTypeService, private puzzlePortionService: PuzzlePortionService, private puzzleModelService: PuzzleModelService) { }

  ngOnInit() {
    this.puzzleModel = this.puzzleModelService.getDefaultPuzzleModel();
    this.puzzlePortions = this.puzzlePortionService.getPuzzlePortions(
      this.puzzleModel.width,
      this.puzzleModel.height,
      this.puzzleModel.portionCountX,
      this.puzzleModel.portionCountY);
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
  
  setPuzzlePortionStyle(puzzlePortion: PuzzlePortion) {
    let styles = {
      'background-image': 'url(/assets/img/dessin-de-chien.jpg)',
      'background-position': '-' + puzzlePortion.positionX + 'px  -' + puzzlePortion.positionY + 'px',
      'width': this.puzzleModelService.getPortionWith(this.puzzleModel) + 'px',
      'height': this.puzzleModelService.getPortionHeight(this.puzzleModel) + 'px'
    };
    return styles;
  }
}