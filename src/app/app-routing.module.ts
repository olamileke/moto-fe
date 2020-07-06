import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';

const routes:Routes = [
                        { path:'', component:HomeComponent },
                        { path:'auth/:type', component:AuthComponent },
                        { path:'admin/auth/:type', component:AuthComponent}
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