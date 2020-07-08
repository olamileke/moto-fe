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
        const url = environment.api_url + 'vehicles?admin=true';

        return this.http.post<VehicleData>(url, data);
    }
}
