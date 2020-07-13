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
import { NewRouteComponent } from './components/new-route/new-route.component';
import { RoutesComponent } from './components/routes/routes.component';
import { DriversComponent } from './components/drivers/drivers.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RequestComponent } from './components/request/request.component';
import { SingleRequestComponent } from './components/single-request/single-request.component';
import { AllRequestsComponent } from './components/all-requests/all-requests.component';
import { LoaderComponent } from './components/loader/loader.component';
import { EditRouteComponent } from './components/edit-route/edit-route.component';
import { EditVehicleComponent } from './components/edit-vehicle/edit-vehicle.component';
import { ReportComponent } from './components/report/report.component';
import { MaintenanceComponent } from './components/maintenance/maintenance.component';

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
    HeaderComponent,
    NewRouteComponent,
    RoutesComponent,
    DriversComponent,
    SidebarComponent,
    RequestComponent,
    SingleRequestComponent,
    AllRequestsComponent,
    LoaderComponent,
    EditRouteComponent,
    EditVehicleComponent,
    ReportComponent,
    MaintenanceComponent
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
