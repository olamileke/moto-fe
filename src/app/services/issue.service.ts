import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IssueData } from '../models/issue.data';
import { IssuesData } from '../models/issues.data';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn:'root' })
export class IssueService {

    constructor(private http:HttpClient) {}

    create(data:FormData): Observable<IssueData> {
        const url = environment.api_url + 'issues';
        return this.http.post<IssueData>(url, data);
    }

    get(page:number): Observable<IssuesData> {
        const url = environment.api_url + `issues?page=${page}`;
        return this.http.get<IssuesData>(url);
    }

    fix(issueID): Observable<IssueData> {
        const url = environment.api_url + `issues/${issueID}`;
        return this.http.patch<IssueData>(url, {});
    }
}