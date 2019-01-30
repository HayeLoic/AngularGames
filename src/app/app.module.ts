import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { MessagesComponent } from './messages/messages.component';
import { SquareComponent } from './tic-tac-toe/square/square.component';
import { DragAndDropGameComponent } from './drag-and-drop-game/drag-and-drop-game.component';

@NgModule({
  declarations: [
    AppComponent,
    TicTacToeComponent,
    MessagesComponent,
    SquareComponent,
    DragAndDropGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    UiSwitchModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
