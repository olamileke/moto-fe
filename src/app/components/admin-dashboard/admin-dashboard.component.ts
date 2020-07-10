import { Component, OnInit } from '@angular/core';
import { Route } from '../../models/route';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  tabs = { add_vehicle:false, requests:true, new_route:false, edit_route:false , routes:false, vehicles:false, drivers:false, maintenance:false }
  activeRoute:Route;

  ngOnInit(): void {
  }

  switchTab(tab:string, route:Route | null = null) {
    if(route) {
        this.activeRoute = route;
    }

    const tabs = Object.keys(this.tabs);

    tabs.forEach(tab => {
        this.tabs[tab] = false;
    })

    this.tabs[tab] = true;
  }

}
