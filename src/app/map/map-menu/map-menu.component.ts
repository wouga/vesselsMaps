import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IRoute } from '../../interfaces/route.interface';
import { DataService } from '../../data.service';
import { MatSelectChange } from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-map-menu',
  templateUrl: './map-menu.component.html',
  styleUrls: ['./map-menu.component.scss']
})
export class MapMenuComponent implements OnInit {
  selectedRoute: IRoute = null;
  vessels: ({
    viewValue: string,
    value: IRoute
  })[] = [];
  @Output() changeSpeedSets = new EventEmitter();
  speedSets = {
    speedGraph: false,
    speedRoute: true
  };

  constructor(private _data: DataService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getRoutes();
    this.activatedRoute.queryParams.subscribe((params: any) => {
      const { speedGraph, speedRoute } = params;
      if (speedGraph) {
        this.speedSets.speedGraph = (speedGraph === 'true');
      }
      if (speedRoute) {
        this.speedSets.speedRoute = (speedRoute === 'true');
      }
    });
    this.router.events
      .subscribe(e => {
        if (e instanceof NavigationEnd) {
          this.getRoutes().then((Routes: IRoute[]) => {
            const Regex = /route\/([0-9]+)/g;
            const urn = Regex.exec(e.url);
            if (urn) {
              this.selectedRoute = Routes.find((route: IRoute) => {
                return route.route_id === urn[1];
              });
            }

          });
        }
      });

  }

  onSetsChange(event) {
    if (this.selectedRoute) {
      this.router.navigate(['/route', this.selectedRoute.route_id], { queryParams: { ...this.speedSets } });
    }
    this.changeSpeedSets.emit(this.speedSets);

  }

  onChange(event: MatSelectChange) {
    const route: IRoute = event.value;
    this.router.navigate(['/route', route.route_id], { queryParams: { ...this.speedSets } });
  }

  getRoutes(): Promise<IRoute[]> {
    return new Promise((resolve, reject) => {
      this._data.getRoutes().subscribe((Routes: IRoute[]) => {
        Routes.forEach((route: IRoute) => {
          this.vessels.push({
            viewValue: `ID:${route.route_id} (${route.from_port} - ${route.to_port})`,
            value: route
          });
        });
        resolve(Routes);
      }, error => { console.error(error); reject(error); });
    });
  }
}
