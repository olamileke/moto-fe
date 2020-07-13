import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue';
import { IssuesData } from '../../models/issues.data';
import { DateService } from '../../services/date.service';
import { IssueData } from 'src/app/models/issue.data';
import { NotifService } from '../../services/notif.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})
export class MaintenanceComponent implements OnInit {

  constructor(private issue:IssueService, private date:DateService, private notif:NotifService) { }

  issues:Issue[];
  dataFetched:boolean = false;
  admin:boolean;

  ngOnInit(): void {
    this.getIssues(1);
  }

  getIssues(page:number) {
    this.admin = JSON.parse(localStorage.getItem('moto_user')).admin;
    this.issue.get(this.admin, page).subscribe((res:IssuesData) => {
        this.issues = res.data.issues;
        this.dataFetched = true;
    })
  }

  fix(issueID:string, j:number) {
    this.issue.fix(issueID).subscribe((res:IssueData) => {
        this.notif.success('Issue marked as fixed');
        this.issues[j] = res.data.issue;
    })
  }

  getDateString(dateStamp): string {
    return this.date.getString(Number(dateStamp));
  }

}
