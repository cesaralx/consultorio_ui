import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ExpedientesService } from './expedientes.service';
import { ExpedientesModel, ConsulModel, PasModel } from './expedientes.model';

// sweetalert2
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-expedientes',
  templateUrl: './expedientes.component.html',
  styleUrls: ['./expedientes.component.scss'],
  animations: [routerTransition()]

})
export class ExpedientesComponent implements OnInit {

  cargando = false;
  expediente = new ExpedientesModel;
  conlsults: ConsulModel[] = [];
  pacientes: PasModel[] = [];
  paciente: PasModel;

  constructor(private expedeintesServices: ExpedientesService,
    ) {}

  async ngOnInit() {
    await this.getConsultorios();
    await this.getPacientes();
  }

  guardar( form: NgForm) {
   Swal.fire({
     title: 'Espere',
     text: 'Guardando información',
     type: 'info',
     allowOutsideClick: false
   });
   Swal.showLoading();
   let peticion: Observable <any>;
   if (!this.expediente._id) {
    console.log('alta');
    this.expediente.usuario_alta = localStorage.getItem('id');
   peticion = this.expedeintesServices.altaExpediente(this.expediente);
   } else {
     console.log('actualizar');
     this.expediente.usuario_mod = localStorage.getItem('id');
    // peticion = this.expedeintesServices.actualizaexpediente(this.expediente);
   }
      //  console.log(this.expediente);
       peticion.subscribe( resp => {
         this.ngOnInit();
         form.reset();
         Swal.fire({
           title: this.expediente.paciente_id,
           text: 'Se guardo correctamente',
           type: 'success'
         });
       });

  }

  getConsultorios = () => new Promise((resolve, reject) =>  {
    this.expedeintesServices.getConsultorios()
      .subscribe( (resp: any) => {
          console.log('Consultorios', resp);
          resolve(this.conlsults = resp);
      });
  })

  getPacientes = () => new Promise((resolve, reject) =>  {
    this.expedeintesServices.getPacientes()
      .subscribe( (resp: any) => {
          console.log('Pacientes', resp);
          resolve(this.pacientes = resp);
      });
  })

  getPaciente = (id_paciente) => new Promise((resolve, reject) =>  {
    this.expedeintesServices.getPaciente(id_paciente)
      .subscribe( (resp: any) => {
          resolve(this.paciente = resp);
      });
  })

 async onChangePaciente(id_paciente) {
   await this.getPaciente(id_paciente);
  this.expediente.email = this.paciente.email;
  this.expediente.celular = this.paciente.telefono;
  this.expediente.antecedentes_gineco_obst.ffp = this.paciente.ffp;
  this.expediente.antecedentes_gineco_obst.fup = this.paciente.fum;
  }


}
