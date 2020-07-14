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

        if(url == 'vehicles' && error.status == 403) {
            this.notif.error('Vehicle plate number is taken');
            displayed = true;
        }
        
        if(url.includes('vehicles') && url.length > 8 && error.status == 403) {
            if(error.error.message.includes('pending')) {
                this.notif.error('there is a pending request for that vehicle');
                displayed = true;
            }

            if(error.error.message.includes('active')) {
                this.notif.error('a driver is using this vehicle currently');
                displayed = true;
            }
        }

        if(url == 'routes' && error.status == 403) {
            const name = error.error.message.split(' ')[0];
            this.notif.error(`${name} exists already`);
            displayed = true;
        }

        if(url.includes('routes') && url.length > 6) {
            if(error.error.message.includes('pending') && error.status == 403) {
                this.notif.error('there is a pending request on this route');
                displayed = true;
            }

            if(error.error.message.includes('plying') && error.status == 403) {
                this.notif.error('there is an active operation on this route');
                displayed = true;
            }
        } 

        if(url.includes('requests')) {
            if(error.error.message.includes('pending') && error.status == 403) {
                this.notif.error('you have a pending vehicle request');
                displayed = true;
            }

            if(error.error.message.includes('active') && error.status == 403) {
                this.notif.error('you are have an active vehicle operation');
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