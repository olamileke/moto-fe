import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { RoutesData } from '../../models/routes.data';
import { Route } from '../../models/route';
import { DateService } from '../../services/date.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  constructor(private route:RouteService, private date:DateService) { }
  
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
    this.route.get(page).subscribe((res:RoutesData) => {
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

}
