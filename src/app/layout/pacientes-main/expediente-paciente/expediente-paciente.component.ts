import { Component, OnInit , OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { ActivatedRoute } from '@angular/router';

import {PacientesService} from '../pacientes/pacientes.service';
import {PacienteModel} from '../pacientes/pacientes.model';



@Component({
  selector: 'app-expediente-paciente',
  templateUrl: './expediente-paciente.component.html',
  styleUrls: ['./expediente-paciente.component.scss'],
  animations: [routerTransition()]
})
export class ExpedientePacienteComponent implements OnInit, OnDestroy  {
  id: string;
  private paciente = new PacienteModel();
  private paciente_id: any;

  constructor(private route: ActivatedRoute,
    private paccientesService: PacientesService) { }

  ngOnInit() {
    this.paciente_id = this.route.params.subscribe(async params => {
      this.id = params.id;
      console.log(this.id);
      await this.getPacient();
      console.log(this.paciente);
   });
  }

  getPacient = () => new Promise( (resolve, reject) => {
    this.paccientesService.getPaciente(this.id).subscribe( (resp: any) =>  {
      resolve(this.paciente = resp);
    });
  })

  ngOnDestroy() {
    this.paciente_id.unsubscribe();
  }

}
