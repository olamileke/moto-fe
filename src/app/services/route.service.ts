import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RouteData } from '../models/route.data';
import { RoutesData } from '../models/routes.data';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn:'root' })
export class RouteService {

    constructor(private http:HttpClient) {}

    create(data:any): Observable<RouteData> {
        const url = environment.api_url + 'routes';
        return this.http.post<RouteData>(url, data);
    }

    get(): Observable<RoutesData> {
        const url = environment.api_url + 'routes';
        return this.http.get<RoutesData>(url);
    }

    edit(data:any, routeID): Observable<RouteData> {
        const url = environment.api_url + 'routes/' + String(routeID);
        return this.http.put<RouteData>(url, data);
    }   
}