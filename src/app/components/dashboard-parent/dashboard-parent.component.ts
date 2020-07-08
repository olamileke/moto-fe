import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-parent',
  templateUrl: './dashboard-parent.component.html',
  styleUrls: ['./dashboard-parent.component.css']
})
export class DashboardParentComponent implements OnInit {

  constructor() { }
  admin:boolean;

  ngOnInit(): void {
    this.determineDashboard();
  }

  determineDashboard(): void {
    const moto_user = JSON.parse(localStorage.getItem('moto_user'));
    this.admin = moto_user.admin;
  }

}
