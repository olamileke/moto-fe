import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  tabs = { all_requests:true, request:false, report:false, routes:false, vehicles:false, maintenance:false }
  selectedVehicle:Vehicle;

  ngOnInit(): void {
  }

  
  switchTab(tab:string, vehicle:Vehicle | null=null) {
    
    if(vehicle) {
        this.selectedVehicle = vehicle;
    }
    const tabs = Object.keys(this.tabs);

    tabs.forEach(tab => {
        this.tabs[tab] = false;
    })

    this.tabs[tab] = true;
  }
}
