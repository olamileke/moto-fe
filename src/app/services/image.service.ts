import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn:'root' })
export class ImageService {

    constructor() {}

    display:Subject<boolean> = new Subject();
    url:Subject<string> = new Subject();

    show(): void {
        this.display.next(true);
    }

    hide(): void {
        this.display.next(false);
    }

    setUrl(url:string): void {
        this.url.next(url);
    }
}