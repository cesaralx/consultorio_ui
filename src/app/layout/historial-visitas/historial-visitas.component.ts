import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Model
import { VisitaModel } from '../visita-medica/visita-medica.model';
import { CitaModel, PacientModel } from '../agenda/cita.model';
import { ConsultorioModel } from '../consultorios/consultorio.model';

// servicios
import { LayoutService, lenguaje } from '../layout.service';
import { AgendaService } from '../agenda/agenda.service';
import { ConsultoriosService } from '../consultorios/consultorios.service';
import { VisitaMedicaService } from '../visita-medica/visita-medica.service';

// sweetalert2
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-historial-visitas',
  templateUrl: './historial-visitas.component.html',
  styleUrls: ['./historial-visitas.component.scss']
})
export class HistorialVisitasComponent implements OnInit {
  private g = new LayoutService();
  cargando = false;
  closeResult: string;
  visita = new VisitaModel();
  visitas: VisitaModel[] = [];
  consultorios: ConsultorioModel [] = [];
  pacientes: PacientModel [] = [];

  constructor( private visitaService: VisitaMedicaService,
               private agendaService: AgendaService,
               private consultoriosService: ConsultoriosService,
               private modal: NgbModal,
               public httpClient: HttpClient) { }

  ngOnInit() {
    this.cargando = true;
    this.getPacientes();
    this.getConsultorios();
    this.getVisitas();
  }

  // Funciones del modal
  open(content) {
    this.modal.open(content, { size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
}

  alta( content) {
    this.visita = new VisitaModel();
    this.open(content);
  }

  getPacientes() {
    this.agendaService.getPacientes()
          .subscribe( async (resp: any) => {
              this.pacientes = resp;
              console.log('pacientes', this.pacientes);
          },
          (error) => {
          console.log(error.message);
          if (error.status === 403) { this.g.onLoggedout(); }
          });
  }

  getConsultorios() {
    this.consultoriosService.getConsultorios()
          .subscribe( async  (resp: any) => {
          this.consultorios = resp;
          },
          (error) => {
          console.log(error.message);
          if (error.status === 403) { this.g.onLoggedout(); }
          });
   }

   // funciones de visitas 
  getVisitas() {
    this.visitaService.getVisitasMedicas()
    .subscribe( async  (resp: any) => {
      this.visitas = resp;
      this.cargando = false;
      this.visitas.forEach( visita => {
        const obj = this.pacientes.find(res => res._id === visita.id_paciente);
        if (obj != null) {
         visita.nombrePaciente = obj.nombre;
        } else {
          visita.nombrePaciente = 'Nombre no valido';
        }
        const resultado = this.consultorios.find(busca => busca._id === visita.id_consultorio);
        if (resultado != null) {
         visita.nombreConsultorio = resultado.nombre;
        } else {
          visita.nombreConsultorio = 'Consulta no valido';
        }

      });
    },
    (error) => {
    console.log(error.message);
    if (error.status === 403) { this.g.onLoggedout(); }
    });
 }

 borrar( visita: VisitaModel, i: number) {
  this.modal.dismissAll();
  Swal.fire({
    title: '¿Está seguro?',
    text: `Está seguro de que desea borrar la visita medica de ${ visita.nombrePaciente}`,
    type: 'question',
    showConfirmButton: true,
    showCancelButton: true
   }).then( resp => {
       if ( resp.value ) {
         this.visitaService.borrarVisita(visita._id).subscribe( (response: any) => {
          console.log(response);
          this.visitas.splice(i, 1);
         },
         (error) => {
         console.log(error.message);
         if (error.status === 403){ this.g.onLoggedout(); }
         });
       }
   });
}

actualizar(visita: VisitaModel, content) {
  // this.consultorio = cons;
  this.visitaService.getVisitaMedica(visita._id).subscribe( (resp: any) => {
    // console.log('Respuesta de consulta consultorio: ', resp);
    this.visita = resp;

  },
  (error) => {
  console.log(error.message);
  if (error.status === 403){ this.g.onLoggedout(); }
  });
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
 
   console.log('actualizar');
  peticion = this.visitaService.actualizaVisita(this.visita);
 
     // console.log(this.consultorio);
     peticion.subscribe( resp => {
       this.ngOnInit();
       Swal.fire({
         title: 'Actualización correcta',
         text: 'Se actualizo correctamente',
         type: 'success'
       });
     },
     (error) => {
     console.log(error.message);
     if (error.status === 403) { this.g.onLoggedout(); }
     });

   }
}
