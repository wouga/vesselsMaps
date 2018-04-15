import { MapService } from './map.service';
import { FormsModule } from '@angular/forms';
import { MapMenuComponent } from './map-menu/map-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {
  MatSelectModule, MatCheckboxModule, MatIconModule, MatButtonModule, MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    AngularOpenlayersModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    NgxChartsModule
  ],
  declarations: [
    MapComponent,
    MapMenuComponent,
  ],
  providers: [
    MapService
  ],
  exports: [
    MapComponent,
    MapMenuComponent
  ]
})
export class MapModule { }
