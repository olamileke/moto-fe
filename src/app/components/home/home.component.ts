import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  sm__lg:boolean;
  md__lg:boolean;

  ngOnInit(): void {
    this.determineBreakpoint();
  }

  determineBreakpoint(): void {
    screen.width > 576 && screen.width < 1025 ? this.sm__lg = true : this.sm__lg = false;
    screen.width > 768 && screen.width < 1025 ? this.md__lg = true : this.md__lg = false;
  }

}
