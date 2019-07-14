import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';


@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  animations: [routerTransition()]

})
export class PacientesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
