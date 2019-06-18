import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { OutputComponent } from './output/output.component';
import {CounterStorageService} from './services/counter-storage.service';
import { ControlsComponent } from './controls/controls.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    OutputComponent,
    ControlsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [CounterStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
