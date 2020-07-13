import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UsersData } from '../../models/users.data';
import { User } from '../../models/user';
import { DateService } from '../../services/date.service';
import { ImageService } from '../../services/image.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  constructor(private driver:UserService, private date:DateService, private image:ImageService) { }
  
  drivers:User[];
  activePage:number; 
  pages:number;
  dataFetched:boolean;

  ngOnInit(): void {
    this.getDrivers(1);
  }

  getDrivers(page:number): void {
    this.driver.get(page).subscribe((res:UsersData) => {
        this.drivers = res.data.users;
        this.activePage = page;
        this.dataFetched = true;
        this.pages = Math.ceil(res.data.total / environment.per_page);
    })
  }

  getDateString(dateStamp): string {
    return this.date.getString(dateStamp);
  }

  viewImage(url:string): void {
    this.image.show();
    this.image.setUrl(url);
  }

  determineInOperation(dateStamp): boolean {
    return this.date.determineInOperation(dateStamp);
  }

}
