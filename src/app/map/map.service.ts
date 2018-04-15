import { Injectable } from '@angular/core';
import { minBy, maxBy, findIndex } from 'lodash';
import { IPoint } from '../interfaces/point.interface';

@Injectable()
export class MapService {


  calcViewCenter(points: IPoint[]): { lat: number, lng: number } {
    const minLat = minBy(points, 'lat').lat;
    const maxLat = maxBy(points, 'lat').lat;
    const minLng = minBy(points, 'lng').lng;
    const maxLng = maxBy(points, 'lng').lng;
    const lat = (maxLat + minLat) / 2;
    const lng = (maxLng + minLng) / 2;
    return { lat, lng };
  }

  calcZoom(points: IPoint[], offset: number = -1): { zoom: number } {
    const minLat = minBy(points, 'lat').lat;
    const maxLat = maxBy(points, 'lat').lat;
    return { zoom: this.degToZoom(Math.abs(maxLat - minLat), offset) };
  }

  degToZoom(deg, offset: number = -1) {
    const zoom = findIndex(
      [360, 180, 90, 45, 22.5, 11.25, 5.625, 2.813, 1.406, 0.703, 0.352, 0.176, 0.088, 0.044, 0.022, 0.011, 0.005, 0.003, 0.001],
      (val) => val < deg) + offset;
    return zoom > 0 ? zoom : 0;
  }

  HSVtoRGB(h: number, s: number, v: number) {
    let r, g, b, i, p, q, t;
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s)) / 100;
    v = Math.max(0, Math.min(100, v)) / 100;

    if (s === 0) {
      r = g = b = v;
    } else {
      h /= 60;
      i = Math.floor(h);
      p = v * (1 - s);
      q = v * (1 - s * (h - i));
      t = v * (1 - s * (1 - (h - i)));
      switch (i) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        default: r = v; g = p; b = q; break;
      }
    }

    return '#' + [r, g, b].map(item => {
      const hex = Math.round(item * 255).toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    }).join('');
  }
}
