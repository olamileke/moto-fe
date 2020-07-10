import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { VehiclesData } from '../../models/vehicles.data';
import { Vehicle } from '../../models/vehicle';
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
  dataFetched:boolean = false;
  @Output() requestVehicle = new EventEmitter();
  @Output() edit = new EventEmitter();  

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(): void {
    this.admin = JSON.parse(localStorage.getItem('moto_user')).admin;
    this.vehicle.get(this.admin).subscribe((res:VehiclesData) => {
        this.vehicles = res.data.vehicles;
        this.dataFetched = true;
    })
  }

  getDate(dateStamp): string {
    return this.date.getString(dateStamp);
  }

  request(vehicle:Vehicle): any {
    this.requestVehicle.emit(vehicle);
  }

  editVehicle(vehicle:Vehicle): void {
    this.edit.emit(vehicle)
  }

  determineInOperation(dateStamp): boolean {

    if(dateStamp < Date.now()) {
        return false;
    }

    return true;
  }

}
