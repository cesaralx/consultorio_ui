import { Component, OnInit, ViewChild, TemplateRef, Input, ElementRef } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ExpedientesSearchService } from './expedientes-search.service';
import { ExpedientesModel, ConsulModel, PasModel } from '../expedientes/expedientes.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';


import { LayoutService } from '../../layout.service';
import { PacientesService } from '../../pacientes-main/pacientes/pacientes.service' ;
import { ExpedientesService } from '../../expedientes-main/expedientes/expedientes.service';


import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

// DataTable
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-expedientes-search',
  templateUrl: './expedientes-search.component.html',
  styleUrls: ['./expedientes-search.component.scss'],
  animations: [routerTransition()]
})
export class ExpedientesSearchComponent implements OnInit, OnDestroy {
  @ViewChild('content', {static: false} ) content: ElementRef;
  expedienteID: string;

  private g = new LayoutService();
  // DataTable
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  closeResult: string;
  cargando = false;
  expediente = new ExpedientesModel();
  expediente_ext = new ExpedientesModel();
  expedientes: ExpedientesModel[] = [];
  consultorios: ConsulModel[] = [];
  pacientes: PasModel[] = [];
  // dtOptions: any;


  private lServices = new LayoutService();

  constructor(private expedientesSearchService: ExpedientesSearchService,
    private pacientesService: PacientesService,
    private expedientesService: ExpedientesService,
    private modal: NgbModal,
    public router: Router,
    private route: ActivatedRoute) { }


  async ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

// carga el parametro si es que existe
    this.route.queryParams.pipe(
      filter(params => params.expedienteId) )
      .subscribe(params => {
        // console.log(params);
        this.expedienteID = params.expedienteId;
        // console.log('Parametro', this.pacienteId);
    });

    this.cargando = true;
    await this.getPacientes();
    this.consultarExpedeintes();
    await this.getExpediente();
    this.updateExternal();

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  updateExternal() {
    if (this.expedienteID) {
      console.log('expediente a editar', this.expedienteID);
      console.log('expediente a editar', this.expediente_ext);
      this.actualizar(this.expediente_ext, this.content);
      this.cargando = false;
    }
  }

  getExpediente = () => new Promise( (resolve, reject) => {
    if (this.expedienteID) {
      this.expedientesSearchService.getExpediente(this.expedienteID)
        .subscribe( (resp: any) => {
          resolve( this.expediente_ext = resp);
        },
        (error) => {
        console.log(error.message);
        if (error.status === 403) { this.lServices.onLoggedout(); }
        });
    } else { resolve(true); }
   })

 getPacientes = () => new Promise ((resolve, reject) => {
  this.pacientesService.getPacientes()
        .subscribe(  (resp: any) => {
           resolve(this.pacientes = resp);

        },
        (error) => {
        console.log(error.message);
        if (error.status === 403) { reject(this.g.onLoggedout()); }
        });
})
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
    // this.consultaPacientes();
    this.consultaConsultorios();
    // console.log(this.consultorio);
    this.modal.open(content, {size: 'lg', backdrop: 'static'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
  }

  borrar( expediente: ExpedientesModel, i: number) {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro de que desea borrar el expediente de ${ expediente.namePaciente}`,
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
        this.expedientes.forEach( element => {
          const obj = this.pacientes.find(res => res._id === element.paciente_id);
          element.namePaciente = obj.nombre;
        });

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
