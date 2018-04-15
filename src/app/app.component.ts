import { IRoute } from './interfaces/route.interface';
import { DataService } from './data.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd, RoutesRecognized } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  onChangeSpeedSets(event) {
  }
}
