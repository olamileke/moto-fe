import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-moto-square',
  templateUrl: './moto-square.component.html',
  styleUrls: ['./moto-square.component.css']
})
export class MotoSquareComponent implements OnInit {

  constructor(private loader:LoaderService) { }

  ngOnInit(): void {
  }

  loading:Subject<boolean> = this.loader.loading;

}
