import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CalcComponent } from './calc/calc.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule, MatButtonModule,    MatToolbarModule ],
  declarations: [ AppComponent ,CalcComponent],
  bootstrap:    [ AppComponent   ]
})
export class AppModule { }
