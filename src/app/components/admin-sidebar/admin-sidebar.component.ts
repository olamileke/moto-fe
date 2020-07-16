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
  tabs = { add_vehicle:false, requests:true, new_route:false, routes:false, vehicles:false, drivers:false, maintenance:false }
  @Output() switchTab = new EventEmitter();
  lg:boolean;

  ngOnInit(): void {
    this.getUser(); 
    this.determineBreakpoint();
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('moto_user'));
  }

  determineBreakpoint(): void {
    screen.width < 1025 ? this.lg = true : this.lg = false;
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
