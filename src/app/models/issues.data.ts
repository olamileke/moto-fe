import { Issue } from './issue';

export interface IssuesData {
    data:{
        issues:Issue[],
        total:number
    }
}