import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotifService } from '../services/notif.service';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn:'root' })
export class TokenInterceptor implements HttpInterceptor {

    constructor(private notif:NotifService) {}

    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {
        
        const jwt_token = localStorage.getItem('moto_token');
        let headers = { };
        let headers_set = true;
        const url = req.url.split(environment.api_url)[1];

        if(jwt_token) {
            headers['Authorization'] = `Bearer ${jwt_token}`;
        }

        if(url.includes('vehicles') && req.method.toLowerCase() == 'post') {
            headers_set = true;
        }

        if(url.includes('users') && req.method.toLowerCase() == 'patch') {
            headers_set = true;
        }

        if(!headers_set) {
            headers['Content-Type'] = 'application/json';
        }

        const reqClone = req.clone({
            setHeaders:headers
        })

        return next.handle(reqClone);
    }
}