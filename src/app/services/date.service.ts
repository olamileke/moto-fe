import { Injectable } from '@angular/core';

@Injectable({ providedIn:'root' })
export class DateService {

    constructor() {}
    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    days = ['sun', 'mon', 'tue', 'wed', 'thur', 'fri', 'sat'];

    getString(datestamp): string {
        const date = new Date(datestamp);
        const dt = date.getDate();
        const day = this.days[date.getDay()];
        const month = this.months[date.getMonth()];
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        let mins, hrs;

        String(hours).length == 1 ? hrs = '0' + String(hours) : hrs = String(hours);
        String(minutes).length == 1 ? mins = '0' + String(minutes) : mins = String(minutes);

        return `${day} ${dt} ${month} ${year}. ${hrs}:${mins}`;

    }

    determineInOperation(dateStamp): boolean {

        if(dateStamp < Date.now()) {
            return false;
        }
    
        return true;
      }
}