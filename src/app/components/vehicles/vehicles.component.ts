import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { VehiclesData } from '../../models/vehicles.data';
import { VehicleData } from '../../models/vehicle.data';
import { Vehicle } from '../../models/vehicle';
import { DateService } from '../../services/date.service';
import { ImageService } from '../../services/image.service';
import { NotifService } from '../../services/notif.service';
import { environment } from '../../../environments/environment.prod';
 
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  constructor(private vehicle:VehicleService, private date:DateService, private notif:NotifService,
  private image:ImageService) { }

  admin:boolean;
  vehicles:Vehicle[];
  dataFetched:boolean = false;
  activePage:number;
  pages:number = 1;
  @Output() requestVehicle = new EventEmitter();
  @Output() edit = new EventEmitter();  

  ngOnInit(): void {
    this.getVehicles(1);
  }

  getVehicles(page:number): void {
    this.admin = JSON.parse(localStorage.getItem('moto_user')).admin;
    this.vehicle.get(page).subscribe((res:VehiclesData) => {
        this.vehicles = res.data.vehicles;
        this.dataFetched = true;
        this.activePage = page;
        this.pages = Math.ceil(res.data.total / environment.per_page);
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

  patchVehicle(id:string, index:number, active:boolean): void {
    this.vehicle.patch(id, active).subscribe((res:VehicleData) => {
        this.vehicles[index] = res.data.vehicle;
        active ? this.notif.success('Vehicle added successfully') : this.notif.success('Vehicle removed successfully');
    })
  }

  viewImage(url:string): void {
    this.image.show();
    this.image.setUrl(url);
  }

  determineInOperation(dateStamp): boolean {
    return this.date.determineInOperation(dateStamp);
  }
}
