import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue';
import { IssuesData } from '../../models/issues.data';
import { DateService } from '../../services/date.service';
import { IssueData } from 'src/app/models/issue.data';
import { ImageService } from '../../services/image.service';
import { NotifService } from '../../services/notif.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  constructor(private issue:IssueService, private date:DateService, private image:ImageService,
  private notif:NotifService) { }

  issues:Issue[];
  dataFetched:boolean = false;
  admin:boolean;
  pages:number = 1;
  activePage:number;

  ngOnInit(): void {
    this.getIssues(1);
  }

  getIssues(page:number) {
    this.admin = JSON.parse(localStorage.getItem('moto_user')).admin;
    this.issue.get(page).subscribe((res:IssuesData) => {
        this.issues = res.data.issues;
        this.dataFetched = true;
        this.activePage = page;
        this.pages = Math.ceil(res.data.total / (environment.per_page + 1));
    })
  }

  fix(issueID:string, j:number) {
    this.issue.fix(issueID).subscribe((res:IssueData) => {
        this.notif.success('Issue marked as fixed');
        this.issues[j] = res.data.issue;
    })
  }

  viewImage(url:string): void {
    this.image.show();
    this.image.setUrl(url);
  }

  getDateString(dateStamp): string {
    return this.date.getString(Number(dateStamp));
  }

}
