import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Route } from '../../models/route';
import { Vehicle } from '../../models/vehicle';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private image:ImageService) { }

  tabs = { add_vehicle:false, edit_vehicle:false, requests:true, new_route:false, edit_route:false , routes:false, vehicles:false, drivers:false, maintenance:false }
  activeRoute:Route;
  activeVehicle:Vehicle;
  display:Subject<boolean> = this.image.display;

  ngOnInit(): void {
  }

  switchTab(tab:string, route:Route | null = null, vehicle:Vehicle | null = null) {
    if(route) {
        this.activeRoute = route;
    }

    if(vehicle) {
        this.activeVehicle = vehicle;
    }

    const tabs = Object.keys(this.tabs);

    tabs.forEach(tab => {
        this.tabs[tab] = false;
    })

    this.tabs[tab] = true;
  }

}
