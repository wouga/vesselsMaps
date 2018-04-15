import { DataService } from './data.service';
import { ApiService } from './api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MapModule } from './map/map.module';
import { AppRouting } from './app.routing';
import {
  MatSidenavModule, MatToolbarModule, MatSelectModule, MatCheckboxModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  exports: [],
  declarations: [
    AppComponent
  ],
  imports: [
    AppRouting,
    BrowserModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSelectModule,
    MapModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [ApiService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
