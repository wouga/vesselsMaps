import { IPoint } from './interfaces/point.interface';
import { IRoute } from './interfaces/route.interface';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import csv = require('csvtojson');
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {
  private dataObs$ = new ReplaySubject(1);
  constructor(private _api: ApiService) { }
  getRoutes(forceRefresh?: boolean) {
    const routeName = 'routes';
    if (!this.dataObs$.observers.length || forceRefresh) {

      const data = this._api.getDataAsString(routeName);
      data.subscribe((result: string) => {
        csv().fromString(result)
          .transf((jsonObj: {
            from_port: string;
            leg_duration: string;
            points: any;
            route_id: string;
            to_port: string;
          }) => {
            jsonObj.points = <IPoint[]>JSON.parse(jsonObj.points).map((point: string) => ({
              lng: point[0],
              lat: point[1],
              timestamp: point[2],
              speed: point[3]
            }));
          })
          .on('end_parsed', (routes: IRoute[]) => {
            this.dataObs$.next(routes);
          }).on('done', (error: any) => {
            if (error) {
              this.dataObs$.error(error);
              this.dataObs$ = new ReplaySubject(1);
            }
          });
      }, (error: any) => {
        console.warn(error);
        this.dataObs$.error(error);
        this.dataObs$ = new ReplaySubject(1);
      });

    }
    return this.dataObs$;
  }
}
