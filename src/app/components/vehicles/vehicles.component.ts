import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { VehiclesData } from '../../models/vehicles.data';
import { Vehicle } from '../../models/vehicle';
import { VehicleData } from 'src/app/models/vehicle.data';
import { DateService } from '../../services/date.service';
 
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  constructor(private vehicle:VehicleService, private date:DateService) { }
  admin:boolean;
  vehicles:Vehicle[];

  ngOnInit(): void {
    this.determineAdmin();
    this.getVehicles();
  }

  determineAdmin(): void {
    this.admin = JSON.parse(localStorage.getItem('moto_user')).admin;
  }

  getVehicles(): void {
    this.vehicle.get(true).subscribe((res:VehiclesData) => {
        this.vehicles = res.data.vehicles;
        console.log(res);
    })
  }

  getDate(dateStamp): string {
    return this.date.getString(dateStamp);
  }

}
