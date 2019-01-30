import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { DragAndDropGameComponent } from './drag-and-drop-game/drag-and-drop-game.component';

const routes: Routes = [
  { path: '', redirectTo: '/tic-tac-toe', pathMatch: 'full' },
  { path: 'tic-tac-toe', component: TicTacToeComponent },
  { path: 'drag-and-drop-game', component: DragAndDropGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }