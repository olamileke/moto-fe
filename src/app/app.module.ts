import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpInterceptors } from './interceptors/http.interceptors';
import { UserService } from './services/user.service';
import { NotifService } from './services/notif.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardParentComponent } from './components/dashboard-parent/dashboard-parent.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    DashboardParentComponent,
    AdminDashboardComponent,
    DashboardComponent,
    AdminSidebarComponent,
    VehiclesComponent,
    AddVehicleComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    HttpInterceptors,
    UserService,
    NotifService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
