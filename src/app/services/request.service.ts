import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestData } from '../models/request.data';
import { RequestsData } from '../models/requests.data';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn:'root' })
export class RequestService { 

    constructor(private http:HttpClient) {}

    create(data:FormData): Observable<RequestData> {
        const url = environment.api_url + 'requests';

        return this.http.post<RequestData>(url, data);
    }

    get(admin:boolean, page:number): Observable<RequestsData> {
        const url = environment.api_url + `requests?admin=${admin}&page=${page}`;
        return this.http.get<RequestsData>(url);
    }

    update(data:any, approved:boolean): Observable<RequestData> {
        const url = environment.api_url + 'requests?approved=' + approved;
        return this.http.patch<RequestData>(url, data)        
    }
}
