import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { RequestsData } from '../../models/requests.data';
import { Request } from '../../models/request';
import { environment } from '../../../environments/environment.prod';


@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.css']
})
export class AllRequestsComponent implements OnInit {

  constructor(private request:RequestService) { }

  requests:Request[];
  activePage:number;
  pages:number;
  dataFetched:boolean; 

  ngOnInit(): void {
    this.getRequests(1);
  }

  getRequests(page:number): void {
    const admin = JSON.parse(localStorage.getItem('moto_user')).admin;

    this.request.get(admin, page).subscribe((res:RequestsData) => {
        this.requests = res.data.requests;
        this.activePage = page;
        this.pages = Math.ceil(res.data.total / environment.per_page);
        this.dataFetched = true;
    })
  }

}
