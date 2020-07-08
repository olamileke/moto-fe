import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  user:User;

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('moto_user'));
  }

}
