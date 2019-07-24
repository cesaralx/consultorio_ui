import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  animations: [routerTransition()]
})
export class HistorialComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
