import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { PacientesService } from './pacientes.service';
import { PacienteModel } from './pacientes.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { LayoutService } from '../layout.service';


// sweetalert2
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

// DataTable
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  animations: [routerTransition()]

})
export class PacientesComponent implements OnInit, OnDestroy {

    // DataTable
    dtOptions: DataTables.Settings = {};
    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    dtTrigger: Subject<any> = new Subject();

    cargando = false;
    closeResult: string;
    paciente = new PacienteModel();
    pacientes: PacienteModel[] = [];
    private g = new LayoutService();
    imgUrl: any = null;

  constructor(private pacientesService: PacientesService,
    private modal: NgbModal) { }

  ngOnInit() {
    this.cargando = true;
    this.consultaUsuarios();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  open(content) {
    // console.log(this.consultorio);
    this.modal.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
  }

  consultaUsuarios() {
    this.pacientesService.getPacientes()
      .subscribe( (resp: any) => {
        this.pacientes = resp;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
        // console.log('consultorios: ', resp);
        this.cargando = false;
      },
      (error) => {
      console.log(error.message);
      if (error.status === 403) { this.g.onLoggedout(); }
      });
   }

   borrar( usuario: PacienteModel, i: number) {
    this.modal.dismissAll();
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro de que desea borrar a ${ usuario.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
     }).then( resp => {
         if ( resp.value ) {
           this.pacientesService.borrarPacientes(usuario._id).subscribe( (response: any) => {
            console.log(response);
            // this.consultaUsuarios();
            this.pacientes.splice(i, 1);
           },
           (error) => {
           console.log(error.message);
           if (error.status === 403) { this.g.onLoggedout(); }
           });
         }
     });
  }

  actualizar(usuario: PacienteModel, content) {
    // this.consultorio = cons;
    this.pacientesService.getPaciente(usuario._id).subscribe( (resp: any) => {
      // console.log('Respuesta de consulta consultorio: ', resp);
      this.paciente = resp;
    },
    (error) => {
    console.log(error.message);
    if (error.status === 403) { this.g.onLoggedout(); }
    });
    this.open(content);
   }

   alta( content) {
      this.paciente = new PacienteModel();
      this.open(content);
   }

   guardar( form: NgForm) {
    this.modal.dismissAll();
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    let peticion: Observable <any>;
    if (!this.paciente._id) {
      // console.log(this.usuario.image);
    peticion = this.pacientesService.altaPacientes(this.paciente);
    } else {
      console.log('actualizar');
    peticion = this.pacientesService.actualizaPacientes(this.paciente);
    }
        // console.log(this.consultorio);
        peticion.subscribe( resp => {
          this.ngOnDestroy();
          this.ngOnInit();
          Swal.fire({
            title: this.paciente.nombre,
            text: 'Se actualizo correctamente',
            type: 'success'
          });
        },
        (error) => {
        console.log(error.message);
        if (error.status === 403) { this.g.onLoggedout(); }
        });
  }

  // carga una imagen
  handleFileInput(files: FileList) {
    this.imgUrl = files.item(0);

    // crea una URL
    const tmppath = URL.createObjectURL(files[0]);
    console.log(this.imgUrl);
    this.paciente.image = tmppath;

  }

}
