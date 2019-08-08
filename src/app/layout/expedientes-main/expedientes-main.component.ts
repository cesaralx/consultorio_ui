import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { routerTransition } from '../../router.animations';


@Component({
  selector: 'app-expedientes-main',
  templateUrl: './expedientes-main.component.html',
  styleUrls: ['./expedientes-main.component.scss'],
  animations: [routerTransition()]
})
export class ExpedientesMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
