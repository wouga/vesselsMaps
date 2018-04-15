import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  private endpoinds = {
    routes: '/data/web_challenge.csv'
  };

  constructor(private http: HttpClient) { }

  getUrl(routeName): string {
    try {
      return this.endpoinds[routeName];
    } catch (error) {
      console.warn(`Unknow Endpoint: ${routeName}`, error);
    }
  }

  getDataAsString(routeName): Observable<String> {
    return this.http.get(this.getUrl(routeName), { responseType: 'text' });
  }

}
