import { IPoint } from './point.interface';

export interface IRoute {
  from_port: string;
  leg_duration: string;
  points: IPoint[];
  route_id: string;
  to_port: string;
}
