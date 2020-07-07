import { Injectable } from '@angular/core';
import { Router, CanActivate } from  '@angular/router';
import { UserService } from '../services/user.service';
import { NotifService } from '../services/notif.service';

@Injectable({ providedIn:'root' })
export class AuthGuard implements CanActivate {

    constructor(private router:Router, private user:UserService, private notif:NotifService) {}

    canActivate(): boolean {
        if(this.user.isAuth()) {
            return true;
        }

        this.router.navigate(['/auth/login']);
        this.notif.error('You are not logged in');
        return false;
    }
}