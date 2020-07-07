import { Injectable } from '@angular/core';
import { Router, CanActivate } from  '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({ providedIn:'root' })
export class GuestGuard implements CanActivate {

    constructor(private router:Router, private user:UserService) {}

    canActivate(): boolean {
        if(!this.user.isAuth()) {
            return true;
        }

        this.router.navigate(['/dashboard']);
        return false;
    }
}