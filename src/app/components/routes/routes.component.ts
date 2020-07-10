import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../services/route.service';
import { RoutesData } from '../../models/routes.data';
import { Route } from '../../models/route';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  constructor(private route:RouteService, private date:DateService) { }
  
  routes:Route[];
  dataFetched:boolean = false;
  admin:boolean;

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes(): void {
    this.admin = JSON.parse(localStorage.getItem('moto_user')).admin;
    this.route.get().subscribe((res:RoutesData) => {
        this.routes = res.data.routes;
        this.dataFetched = true;
    })
  }

  getDateString(dateStamp):string {
    return this.date.getString(dateStamp);
  }

}
