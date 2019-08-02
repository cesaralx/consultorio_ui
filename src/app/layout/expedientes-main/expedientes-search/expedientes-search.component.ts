import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ExpedientesSearchService } from './expedientes-search.service';
import { ExpedientesModel, ConsulModel, PasModel } from '../expedientes/expedientes.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { LayoutService } from '../../layout.service';

import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

// DataTable
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-expedientes-search',
  templateUrl: './expedientes-search.component.html',
  styleUrls: ['./expedientes-search.component.scss']
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

  private lServices = new LayoutService();

  constructor(private expedientesSearchService: ExpedientesSearchService) { }

  ngOnInit() {
    this.cargando = true;
    this.consultarExpedeintes();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
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

   }


}
