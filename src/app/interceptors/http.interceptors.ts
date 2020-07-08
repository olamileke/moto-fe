import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './error.interceptor';
import { TokenInterceptor } from './token.interceptor';


export const HttpInterceptors = [
    { provide:HTTP_INTERCEPTORS, useClass:ErrorInterceptor, multi:true },
    { provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor, multi:true },
]