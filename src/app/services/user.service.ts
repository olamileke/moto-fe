import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { UserData } from '../models/user.data';

@Injectable({ providedIn:'root' })
export class UserService {
    
    constructor(private http:HttpClient) {} 

    create(data:any, admin:boolean): Observable<UserData> {
        const url = environment.api_url + 'users?admin=' + admin;
        return this.http.post<UserData>(url, data);
    }

    authenticate(data:any): Observable<UserData> {
        const url = environment.api_url + 'authenticate';
        return this.http.post<UserData>(url, data);
    } 

    isAuth():boolean {
        const token = localStorage.getItem('moto_token');

        if(!token) {
            return false;
        }

        return true;
    }
}
