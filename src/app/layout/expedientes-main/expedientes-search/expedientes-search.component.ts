import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ExpedientesSearchService } from './expedientes-search.service';
import { ExpedientesModel, ConsulModel, PasModel } from '../expedientes/expedientes.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { LayoutService } from '../../layout.service';
import { PacientesService } from '../../pacientes-main/pacientes/pacientes.service' ;
import { ExpedientesService } from '../../expedientes-main/expedientes/expedientes.service';


import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

// DataTable
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-expedientes-search',
  templateUrl: './expedientes-search.component.html',
  styleUrls: ['./expedientes-search.component.scss'],
  animations: [routerTransition()]
})
export class ExpedientesSearchComponent implements OnInit, OnDestroy {
  

  // DataTable
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  closeResult: string;
  cargando = false;
  expediente = new ExpedientesModel();
  expedientes: ExpedientesModel[] = [];
  consultorios: ConsulModel[] = [];
  pacientes: PasModel[] = [];
  // dtOptions: any;


  private lServices = new LayoutService();

  constructor(private expedientesSearchService: ExpedientesSearchService,
    private pacientesService: PacientesService,
    private expedientesService: ExpedientesService,
    private modal: NgbModal) { }


  ngOnInit() {
    this.dtOptions = {

      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.cargando = true;
    this.consultarExpedeintes();

    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10
    // };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  consultaPacientes() {
    this.pacientesService.getPacientes()
      .subscribe( (resp: any) => {
        this.pacientes = resp;
      },
      (error) => {
      console.log(error.message);
      if (error.status === 403) { this.lServices.onLoggedout(); }
      });
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
      console.log('actualizar');
      this.expediente.usuario_mod = localStorage.getItem('id');
      peticion = this.expedientesSearchService.actualizaExpediente(this.expediente);
        peticion.subscribe( resp => {
          this.ngOnDestroy();
          this.ngOnInit();
          form.reset();
          Swal.fire({
            title: this.expediente.paciente_id,
            text: 'Se guardo correctamente',
            type: 'success'
          });
          this.modal.dismissAll();
        });
   }

   consultaConsultorios() {
    this.expedientesService.getConsultorios()
      .subscribe( (resp: any) => {
        this.consultorios = resp;
      },
      (error) => {
      console.log(error.message);
      if (error.status === 403) { this.lServices.onLoggedout(); }
      });
   }

  open(content) {
    this.consultaPacientes();
    this.consultaConsultorios();
    // console.log(this.consultorio);
    this.modal.open(content, {size: 'lg'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
  }

  borrar( expediente: ExpedientesModel, i: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro de que desea borrar a ${ expediente._id}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
     }).then( resp => {
         if ( resp.value ) {
           this.expedientesSearchService.borrarExpediente(expediente._id).subscribe( (response: any) => {
            console.log(response);
            this.ngOnDestroy();
            this.ngOnInit();
            this.cargando = false;
           },
           (error) => {
           console.log(error.message);
           if (error.status === 403) { this.lServices.onLoggedout(); }
           });
         }
     });
  }

  consultarExpedeintes() {
    this.expedientesSearchService.getExpedientes()
      .subscribe( (resp: any) => {
        this.expedientes = resp;
        // console.log('consultorios: ', resp);
        this.dtTrigger.next();
        this.cargando = false;
      },
      (error) => {
      console.log(error.message);
      if (error.status === 403) { this.lServices.onLoggedout(); }
      });
   }

   actualizar(cons: ExpedientesModel, content) {
    // this.consultorio = cons;
    this.expedientesSearchService.getExpediente(cons._id).subscribe( (resp: any) => {
      // console.log('Respuesta de consulta consultorio: ', resp);
      this.expediente = resp;
    },
    (error) => {
    console.log(error.message);
    if (error.status === 403) { this.lServices.onLoggedout(); }
    });
    this.open(content);
   }


}
