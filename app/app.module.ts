import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppComponent } from './app.component';
import { SeatService } from './seat.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  // For ngModel in app.component.html
    HttpClientModule  // To make HTTP requests
  ],
  providers: [SeatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
