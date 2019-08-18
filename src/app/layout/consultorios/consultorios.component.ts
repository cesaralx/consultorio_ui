import { Component, OnInit } from '@angular/core';
import { ConsultoriosService } from './consultorios.service';
import { ConsultorioModel, UsModel } from './consultorio.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { LayoutService, lenguaje } from '../layout.service';

// sweetalert2
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { style } from '@angular/animations';


@Component({
  selector: 'app-consultorios',
  templateUrl: './consultorios.component.html',
  styleUrls: ['./consultorios.component.scss']
})
export class ConsultoriosComponent implements OnInit {

  closeResult: string;
  cargando = false;
  consultorio = new ConsultorioModel();
  consultorios: ConsultorioModel[] = [];
  users: UsModel[] = [];
  dtOptions: any = {};

  private g = new LayoutService();

  constructor( private consultoriosServices: ConsultoriosService,
                private modal: NgbModal) { }

  ngOnInit() {
    this.dtOptions = {
      dom: 'Bfrtip',
      buttons: [
        'pdfHtml5',
        'print',
        'excel'
      ],
      pagingType: 'full_numbers',
      pageLength: 10
    };
      this.cargando = true;
      this.consultarConsultorios();
      this.getUsuarios();

    }

  open(content) {
    // console.log(this.consultorio);
    this.modal.open(content, {size: 'lg'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
}

    borrar( consultorio: ConsultorioModel, i: number) {
      this.modal.dismissAll();
      Swal.fire({
        title: '¿Está seguro?',
        text: `Está seguro de que desea borrar a ${ consultorio.nombre}`,
        type: 'question',
        showConfirmButton: true,
        showCancelButton: true
       }).then( resp => {
           if ( resp.value ) {
             this.consultoriosServices.borrarConsultorio(consultorio._id).subscribe( (response: any) => {
              console.log(response);
              this.consultorios.splice(i, 1);
             },
             (error) => {
             console.log(error.message);
             if (error.status === 403) { this.g.onLoggedout(); }
             });
           }
       });
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
      if (!this.consultorio._id) {
      peticion = this.consultoriosServices.altaConsultorio(this.consultorio);
      // this.consultorios.push(this.consultorio);
      } else {
        console.log('actualizar');
       peticion = this.consultoriosServices.actualizaConsultorio(this.consultorio);
      }
          // console.log(this.consultorio);
          peticion.subscribe( resp => {
            this.ngOnInit();
            Swal.fire({
              title: this.consultorio.nombre,
              text: 'Se actualizo correctamente',
              type: 'success'
            });
          },
          (error) => {
          console.log(error.message);
          if (error.status === 403) { this.g.onLoggedout(); }
          });

        }

   actualizar(cons: ConsultorioModel, content) {
    // this.consultorio = cons;
    this.consultoriosServices.getConsultorio(cons._id).subscribe( (resp: any) => {
      // console.log('Respuesta de consulta consultorio: ', resp);
      this.consultorio = resp;

    },
    (error) => {
    console.log(error.message);
    if (error.status === 403) { this.g.onLoggedout(); }
    });
    this.open(content);
   }

   alta( content) {
      this.consultorio = new ConsultorioModel();
      this.open(content);
   }

   consultarConsultorios() {
    this.consultoriosServices.getConsultorios()
      .subscribe( (resp: any) => {
        this.consultorios = resp;
        // console.log('consultorios: ', resp);
        this.cargando = false;
      },
      (error) => {
      console.log(error.message);
      if (error.status === 403) { this.g.onLoggedout(); }
      });
   }

   getUsuarios() {
      this.consultoriosServices.getUsuarios()
        .subscribe( (resp: any) => {
          console.log(resp);
          this.users = resp;
        },
        (error) => {
        console.log(error.message);
        if (error.status === 403) { this.g.onLoggedout(); }
        });
   }




}
