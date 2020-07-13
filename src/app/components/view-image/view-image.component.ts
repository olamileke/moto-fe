import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.css']
})
export class ViewImageComponent implements OnInit {

  constructor(private image:ImageService) { }

  ngOnInit(): void {
  }

  display:Subject<boolean> = this.image.display;
  url = this.image.url;

  close(): void {
    this.image.hide();
  }
}
