import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotifService } from '../services/notif.service';

@Injectable({ providedIn:'root' })
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private notif:NotifService) {}

    intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(catchError(err => this.handleError<any>(err)));
    }

    handleError<T>(err:any):Observable<any> {
        console.log(err);
        this.notif.error('An error occured');
        return of(err as T);
    }
}