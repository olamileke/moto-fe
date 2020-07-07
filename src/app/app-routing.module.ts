import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardParentComponent } from './components/dashboard-parent/dashboard-parent.component';

const routes:Routes = [
                        { path:'', component:HomeComponent, canActivate:[GuestGuard] },
                        { path:'auth/:type', component:AuthComponent, canActivate:[GuestGuard] },
                        { path:'admin/auth/:type', component:AuthComponent, canActivate:[GuestGuard]},
                        { path:'dashboard', component:DashboardParentComponent, canActivate:[AuthGuard] }
                        ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
