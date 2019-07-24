import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usr-view',
  templateUrl: './usr-view.component.html',
  styleUrls: ['./usr-view.component.scss']
})
export class UsrViewComponent implements OnInit {

  collapedSideBar: boolean;

  constructor() { }

  ngOnInit() {
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
}

}
