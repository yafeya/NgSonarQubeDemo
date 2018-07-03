import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import * as Services from '../services/index'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [{provide: Services.TourServiceToken, useClass: Services.TourService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
