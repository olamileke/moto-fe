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

    get(page:number | null = null): Observable<RoutesData> {
        let url;
        page ? url = environment.api_url + 'routes?page=' + page : url = environment.api_url + 'routes?all=true';
        return this.http.get<RoutesData>(url);
    }

    edit(data:any, routeID:string): Observable<RouteData> {
        const url = environment.api_url + 'routes/' + String(routeID);
        return this.http.put<RouteData>(url, data);
    } 
    
    delete(routeID:string): Observable<any> {
        const url = environment.api_url + 'routes/' + routeID;
        return this.http.delete<any>(url);
    }
}