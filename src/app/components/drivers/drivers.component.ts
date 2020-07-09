import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UsersData } from '../../models/users.data';
import { User } from '../../models/user';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  constructor(private driver:UserService) { }
  
  drivers:User[];

  ngOnInit(): void {
    this.getDrivers();
  }

  getDrivers(): void {
    this.driver.get().subscribe((res:UsersData) => {
        console.log(res);
        this.drivers = res.data.users;
    })
  }

}
