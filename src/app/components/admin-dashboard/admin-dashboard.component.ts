import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  tabs = { add_vehicle:false, requests:true, new_route:false, routes:false, vehicles:false, drivers:false, maintenance:false }

  ngOnInit(): void {
  }

  switchTab(tab:string) {
    const tabs = Object.keys(this.tabs);

    tabs.forEach(tab => {
        this.tabs[tab] = false;
    })

    this.tabs[tab] = true;
  }

}
