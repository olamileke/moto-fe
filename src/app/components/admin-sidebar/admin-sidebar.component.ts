import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  constructor() { }
  user:User;
  tabs = { add_vehicle:false, pending:true, all_requests:false, new_route:false, routes:false, vehicles:false, drivers:false, maintenance:false }
  @Output() switchTab = new EventEmitter();

  ngOnInit(): void {
    this.getUser(); 
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('moto_user'));
  }

  switch(tab:string) {
    const tabs = Object.keys(this.tabs);
    tabs.forEach(tab => {
        this.tabs[tab] = false;
    })
    this.tabs[tab] = true;
    this.switchTab.emit(tab);
  }

}
