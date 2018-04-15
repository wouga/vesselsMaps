import { IRoute } from './../interfaces/route.interface';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../data.service';
import { IPoint } from '../interfaces/point.interface';
import { maxBy, minBy, findIndex, last } from 'lodash';
import { MatSnackBar } from '@angular/material';
import * as moment from 'moment';
import { MapService } from './map.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  graphData: Array<{ name: string, series: any }> = null;

  colorScheme = {
    domain: ['#5AA454']
  };
  private _route: IRoute = null;
  public lineData = [];
  private width = 5;
  public info = {
    lat: 52.237049,
    lng: 21.017532,
    speedRoute: true,
    speedGraph: false,
    zoom: 7,
    defaultWidth: 4,
    selectedWidth: 10,
    borderPoints: []
  };
  constructor(
    private _data: DataService,
    private _mapService: MapService,
    private activatedRoute: ActivatedRoute,
    public snackBar: MatSnackBar
  ) {

  }
  ngOnInit(): void {
    this.addRouterListner();
  }


  addRouterListner(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.speedRoute) {
        this.info.speedRoute = (params.speedRoute === 'true');
      }
      if (params && params.speedGraph) {
        this.info.speedGraph = (params.speedGraph === 'true');
      }
    });

    this.activatedRoute.params.subscribe((params) => {
      if (params && params.id) {
        this.getRoute(params.id);
      }
    });
  }

  getRoute(id: string) {
    this._data.getRoutes().subscribe((Routes: IRoute[]) => {
      const foundRoute: IRoute[] = Routes
        .filter((route: IRoute) => route.route_id === id);
      if (foundRoute.length) {
        this._route = foundRoute[0];
        this.prepareLineData(foundRoute[0]);
        this.prepareGraphData(foundRoute[0]);
      }
    });
  }

  prepareGraphData(data: IRoute) {
    const series = data.points.map((point: IPoint) => {
      return { name: point.timestamp, value: point.speed };
    });
    this.graphData = [{ 'name': `Route ID: ${data.route_id}`, 'series': series }];
  }

  onGraphSelect(event) {
    const snackBarRef = this.snackBar.open('Detail View', 'Close');
    snackBarRef.onAction().subscribe(() => {
      this.calcViewInfo(this._route.points);
      this.lineData.forEach(line => { line.width = this.info.defaultWidth; });
    });
    const foundPoints: IPoint[] = [];
    if (event && event.name) {
      this.lineData.forEach(line => {
        if ([line.p0, line.p1]
          .filter((point) => point.timestamp === event.name).length > 0) {
          line.width = this.info.selectedWidth;
          foundPoints.push(line.p0, line.p1);
        } else {
          line.width = this.info.defaultWidth;
        }
      });
      if (foundPoints.length > 0) {
        this.calcViewInfo(foundPoints, { offset: -2 });
      }
    }
  }

  calcViewInfo(points: IPoint[], options = { offset: -1 }) {
    this.info = {
      ...this.info,
      ...this._mapService.calcViewCenter(points),
      ...this._mapService.calcZoom(points, options.offset)
    };
  }

  timestamp2Date(timestamp) {
    return moment.unix(Math.floor(timestamp / 1000))
      .format('DD/MM/YYYY HH:mm:ss');
  }

  prepareLineData(data: IRoute) {
    const maxSpeed = maxBy(data.points, 'speed').speed;
    this.calcViewInfo(data.points);
    this.lineData = [];
    data.points.forEach((point: IPoint, idx: number, points: IPoint[]) => {
      if (idx > 0) {
        const p0 = points[idx - 1];
        const p1 = points[idx];
        const width = this.info.defaultWidth;
        const avgSpeed: number = Number(((p0.speed + p1.speed) / 2).toFixed(2));
        const color = this._mapService.HSVtoRGB(((avgSpeed * 120) / maxSpeed), 100, 75);
        this.lineData.push({ p0, p1, avgSpeed, color, width });
      }
    });
    this.info.borderPoints = [
      { type: 'start', name: data.from_port, lat: data.points[0].lat, lng: data.points[0].lng },
      { type: 'end', name: data.to_port, lat: last(data.points).lat, lng: last(data.points).lng }
    ];
  }

}
