import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
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

  constructor(private expedeintesServices: ExpedientesService,
    ) {}

  ngOnInit() {
    this.getConsultorios();
    this.getPacientes();
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
         Swal.fire({
           title: this.expediente.paciente_id,
           text: 'Se guardo correctamente',
           type: 'success'
         });
       });

  }

  getConsultorios() {
    this.expedeintesServices.getConsultorios()
      .subscribe( (resp: any) => {
          console.log(resp);
          this.conlsults = resp;
      });
  }

  getPacientes() {
    this.expedeintesServices.getPacientes()
      .subscribe( (resp: any) => {
          console.log(resp);
          this.pacientes = resp;
      });
  }


}
