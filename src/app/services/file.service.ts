import { Injectable } from '@angular/core';
import { NotifService } from './notif.service';

@Injectable({ providedIn:'root' })
export class FileService {

    constructor(private notif:NotifService) {}

    validate(file:File): boolean {
        const type = file.type.toLowerCase();
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    
        if(!allowedTypes.includes(type)) {
            this.notif.error('file format not supported!');
            return false;
        }
    
        if(file.size > 6000000) {
            this.notif.error('image is too large!');
            return false;
        }
    
        return true;
      }
}