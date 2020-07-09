import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }
  tabs = { all_requests:true, report:false, routes:false, vehicles:false, maintenance:false }
  @Output() switchTab = new EventEmitter();

  ngOnInit(): void {
  }

  switch(tab:string) {
    const tabs = Object.keys(this.tabs);
    tabs.forEach(tab => {
        this.tabs[tab] = false;
    })
    this.tabs[tab] = true;
    this.switchTab.emit(tab);
  }

}
