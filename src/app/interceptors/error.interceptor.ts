import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotifService } from '../services/notif.service';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn:'root' })
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private notif:NotifService) {}

    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(catchError(err => this.handleError<any>(err)));
    }

    handleError<T>(error:any):Observable<any> {
        console.log(error);
        let displayed = false;
        const url = error.url.split(environment.api_url)[1];

        if(url.includes('users')) {
            if(error.status == 403) {
                this.notif.error('User with email exists already');
                displayed = true;
            }
        }

        if(url == 'authenticate') {
            if(error.status == 404) {
                this.notif.error('incorrect username or password');
                displayed = true;
            }
        }

        if(!displayed) {
            this.notif.error('An error ocurred');
        }

        return of(error as T);
    }
}