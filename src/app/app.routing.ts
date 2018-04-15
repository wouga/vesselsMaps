import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { MapComponent } from './map/map.component';

const appRoutes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'route' },
  { path: 'route/:id', component: MapComponent },
  { path: 'route', component: MapComponent },
  { path: '**', redirectTo: '' },

];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(
  appRoutes, { enableTracing: false });
