import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { OtherComponent } from './other/other.component';

const routes: Routes = [
  { path: '', redirectTo: '/tic-tac-toe', pathMatch: 'full' },
  { path: 'tic-tac-toe', component: TicTacToeComponent },
  { path: 'other', component: OtherComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }