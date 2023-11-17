// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InputComponent } from './components/input/input.component'
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, InputComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
