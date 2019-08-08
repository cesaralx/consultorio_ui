import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';


@Component({
  selector: 'app-pacientes-main',
  templateUrl: './pacientes-main.component.html',
  styleUrls: ['./pacientes-main.component.scss'],
  animations: [routerTransition()]
})
export class PacientesMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
