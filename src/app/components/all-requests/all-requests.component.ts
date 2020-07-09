import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { RequestsData } from '../../models/requests.data';
import { Request } from '../../models/request';

@Component({
  selector: 'app-all-requests',
  templateUrl: './all-requests.component.html',
  styleUrls: ['./all-requests.component.css']
})
export class AllRequestsComponent implements OnInit {

  constructor(private request:RequestService) { }

  requests:Request[];
  dataFetched:boolean;

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests(): void {
    const admin = JSON.parse(localStorage.getItem('moto_user')).admin;

    this.request.get(admin).subscribe((res:RequestsData) => {
        this.requests = res.data.requests;
        this.dataFetched = true;
    })
  }

}
