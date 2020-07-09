import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { NotifService } from './notif.service';
import { UsersData } from '../models/users.data';
import { UserData } from '../models/user.data';

@Injectable({ providedIn:'root' })
export class UserService {
    
    constructor(private http:HttpClient, private router:Router, private notif:NotifService) {} 

    create(data:any, admin:boolean): Observable<UserData> {
        const url = environment.api_url + 'users?admin=' + admin;
        return this.http.post<UserData>(url, data);
    }

    get(): Observable<UsersData> {
        const url = environment.api_url + 'users?admin=true';
        return this.http.get<UsersData>(url);
    }

    edit(data:FormData): Observable<UserData> {
        console.log(data);
        const url = environment.api_url + 'users?field=avatar';
        return this.http.patch<UserData>(url, data);
    }

    authenticate(data:any): Observable<UserData> {
        const url = environment.api_url + 'authenticate';
        return this.http.post<UserData>(url, data);
    } 

    logout(): void {
        const user = JSON.parse(localStorage.getItem('moto_user'));
        localStorage.clear();
        user.admin ? this.router.navigate(['/admin/auth/login']) : this.router.navigate(['/auth/login']);
        this.notif.success('Logged out successfully');
    }

    isAuth():boolean {
        const token = localStorage.getItem('moto_token');

        if(!token) {
            return false;
        }

        return true;
    }
}
