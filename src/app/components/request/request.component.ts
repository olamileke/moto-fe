import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from '../../models/vehicle';
import { RouteService } from '../../services/route.service';
import { RoutesData } from '../../models/routes.data';
import { Route } from '../../models/route';
import { Request } from '../../models/request';
import { RequestData } from '../../models/request.data';
import { RequestService } from '../../services/request.service';
import { NotifService } from '../../services/notif.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  constructor(private request:RequestService, private route:RouteService, private notif:NotifService,
  private fb:FormBuilder) { }

  requestForm:FormGroup;
  routes:Route[];
  dataFetched:boolean = false;
  @Input() vehicle:Vehicle;
  @Output() vehicles = new EventEmitter();
 
  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes(): void {
    this.route.get().subscribe((res:RoutesData) => {
        this.routes = res.data.routes;
        this.dataFetched = true;
        this.createForm();
    })
  }

  createForm(): void {
    this.requestForm = this.fb.group({
        vehicleID:[this.vehicle._id, [Validators.required]],
        routeID:[this.routes[0]._id, [Validators.required]],
        days:['', [Validators.required]]
    })
  }

  submit(form:FormGroup): void {
    this.request.create(form.value).subscribe((res:RequestData) => {
        this.notif.success('Request created successfully');
        this.viewVehicles();
    })
  }

  viewVehicles(): void {
    this.vehicles.emit();
  }

}
