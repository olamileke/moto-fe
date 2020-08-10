import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleData } from '../models/vehicle.data';
import { VehiclesData } from '../models/vehicles.data';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn:'root' })
export class VehicleService { 

    constructor(private http:HttpClient) {}

    create(data:FormData): Observable<VehicleData> {
        const url = environment.api_url + 'vehicles';
        return this.http.post<VehicleData>(url, data);
    }

    get(page:number): Observable<VehiclesData> {
        const url = environment.api_url + `vehicles?page=${page}`;
        return this.http.get<VehiclesData>(url);
    }

    edit(id, data:FormData): Observable<VehicleData> {
        const url = environment.api_url + 'vehicles/' + String(id);
        return this.http.put<VehicleData>(url, data);
    }

    patch(vehicleID:string, active:boolean = null ): Observable<VehicleData> {
        let url;
        active == true || active == false ?  url = environment.api_url + `vehicles/${vehicleID}?active=${active}` :
        url =  url = environment.api_url + `vehicles/${vehicleID}?serviced=true`;
        return this.http.patch<VehicleData>(url, {});
    }
}
