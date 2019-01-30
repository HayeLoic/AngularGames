import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';
import { MessagesComponent } from './messages/messages.component';
import { SquareComponent } from './tic-tac-toe/square/square.component';

@NgModule({
  declarations: [
    AppComponent,
    TicTacToeComponent,
    MessagesComponent,
    SquareComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    UiSwitchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
