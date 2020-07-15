import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private image:ImageService) { }

  tabs = { all_requests:true, request:false, report:false, routes:false, vehicles:false, maintenance:false }
  selectedVehicle:Vehicle;

  ngOnInit(): void { 
  }
  
  display:Subject<boolean> = this.image.display;
  
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
