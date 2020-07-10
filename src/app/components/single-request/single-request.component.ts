import { Component, OnInit, Input } from '@angular/core';
import { Request } from '../../models/request';
import { DateService } from '../../services/date.service';
import { RequestService } from '../../services/request.service';
import { RequestData } from '../../models/request.data';
import { NotifService } from '../../services/notif.service';

@Component({
  selector: 'app-single-request',
  templateUrl: './single-request.component.html',
  styleUrls: ['./single-request.component.css']
})
export class SingleRequestComponent implements OnInit {

  constructor(private date:DateService, private request_service:RequestService, private notif:NotifService) { }

  @Input() request:Request;
  admin:boolean;

  ngOnInit(): void {
    this.determineAdmin();
  }

  determineAdmin(): void {
    this.admin = JSON.parse(localStorage.getItem('moto_user')).admin;
  }

  getDateString(dateStamp): string {
    return this.date.getString(dateStamp);
  }

  update(approved:boolean) {
    const data = { requestID:this.request._id };
    this.request_service.update(data, approved).subscribe((res:RequestData) => {

        if(approved) { this.notif.success('Request granted')} else { this.notif.error('Request denied') };
        this.request.pending = false;
        this.request.approved = approved;
    })
  }

}
