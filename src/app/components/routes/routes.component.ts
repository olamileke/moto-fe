import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { RoutesData } from '../../models/routes.data';
import { RouteData } from '../../models/route.data';
import { Route } from '../../models/route';
import { DateService } from '../../services/date.service';
import { NotifService } from '../../services/notif.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  constructor(private route:RouteService, private date:DateService, private notif:NotifService) { }
  
  routes:Route[];
  dataFetched:boolean = false;
  activePage:number;
  pages:number;
  admin:boolean;
  @Output() edit = new EventEmitter();

  ngOnInit(): void {
    this.getRoutes(1);
  }

  getRoutes(page:number): void {
    this.admin = JSON.parse(localStorage.getItem('moto_user')).admin;
    this.route.get(this.admin, page).subscribe((res:RoutesData) => {
        this.routes = res.data.routes;
        this.dataFetched = true;
        this.activePage = page;
        this.pages = Math.ceil(res.data.total / environment.per_page);
    })
  }

  getDateString(dateStamp):string {
    return this.date.getString(dateStamp);
  }

  editRoute(route:Route) {
    this.edit.emit(route);
  }

  patchRoute(id:string, index:number, active:boolean): void {
    this.route.patch(id, active).subscribe((res:RouteData) => {
        this.routes[index] = res.data.route;
        active ? this.notif.success('Route added successfully') : this.notif.success('Route canceled successfully');
    })
  }

}
