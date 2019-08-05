import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  HttpClient, HttpRequest,
  HttpResponse, HttpEvent
} from '@angular/common/http';
import { Subscription } from 'rxjs';
// Model
import { VisitaModel } from './visita-medica.model';
import { CitaModel, PacientModel } from '../agenda/cita.model';
import { ConsultorioModel } from '../consultorios/consultorio.model';

// Servicios
import { VisitaMedicaService } from './visita-medica.service';
import { LayoutService, lenguaje } from '../layout.service';
import { AgendaService } from '../agenda/agenda.service';
import { ConsultoriosService } from '../consultorios/consultorios.service';

// sweetalert2
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-visita-medica',
  templateUrl: './visita-medica.component.html',
  styleUrls: ['./visita-medica.component.scss']
})
export class VisitaMedicaComponent implements OnInit {
  closeResult: string;
  cargando = false;
  visita = new VisitaModel();
  visitas: VisitaModel[] = [];
  citas: CitaModel[] = [];
  cita: CitaModel = new CitaModel();
  consultorios: ConsultorioModel [] = [];
  pacientes: PacientModel [] = [];
  editable: boolean = false;
   // drop file
   accept = '*';
  files: File[] = [];
  progress: number;
  // url = 'https://evening-anchorage-3159.herokuapp.com/api/'
  url = 'https://jquery-file-upload.appspot.com/';
  hasBaseDropZoneOver: boolean = false;
  httpEmitter: Subscription;
  httpEvent: HttpEvent<{}>;
  lastFileAt: Date;

  sendableFormData: FormData; // populated via ngfFormData directive

  dragFiles: any;
  validComboDrag: any;
  lastInvalids: any;
  fileDropDisabled: any;
  maxSize: any;
  baseDropValid: any;


  private g = new LayoutService();

  constructor( private visitaService: VisitaMedicaService,
              private agendaService: AgendaService,
              private consultoriosService: ConsultoriosService,
              private modal: NgbModal,
              public httpClient: HttpClient) { }

  ngOnInit() {
    this.cargando = true;
    this.getConsultorios();
    this.getPacientes();
    this.getCitas();
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

  citaVisitaMedica(c: CitaModel , content) {
    this.editable = true;
    this.cita = c;
    const obj = this.pacientes.find(res => res._id === this.cita.id_paciente);
    const resultado = this.consultorios.find(busca => busca._id === this.cita.id_consultorio);
     this.visita = new VisitaModel();
     this.visita.id_cita = this.cita._id;
     this.visita.id_paciente = this.cita.id_paciente;
     this.visita.nombrePaciente = obj.nombre;
     this.visita.nombreConsultorio = resultado.nombre;
     this.visita.id_usuario = this.cita.id_usuario;
     this.visita.id_consultorio = this.cita.id_consultorio;
     this.visita.fecha = this.cita.fecha;
    this.open(content);
  }
// Funciones para traerese registros de consultas y pacientes 
  getConsultorios() {
    this.consultoriosService.getConsultorios()
          .subscribe( (resp: any) => {
          this.consultorios = resp;
          },
          (error) => {
          console.log(error.message);
          if (error.status === 403) { this.g.onLoggedout(); }
          });
   }

   getCitas() {
    this.agendaService.getCitas()
        .subscribe( (resp: any) => {
        this.citas = resp;
        if (this.citas === null) { return [] }
        this.cargando = false;
        console.log('Citas medicas:', this.citas);
         this.citas.forEach( cita => {
           const obj = this.pacientes.find(res => res._id === cita.id_paciente);
           if (obj != null) {
            cita.nombrePaciente = obj.nombre;
           } else {
             cita.nombrePaciente = 'Nombre no valido';
           }
           const resultado = this.consultorios.find(busca => busca._id === cita.id_consultorio);
           if (resultado != null) {
            cita.nombreConsultorio = resultado.nombre;
           } else {
             cita.nombreConsultorio = 'Consulta no valido';
           }

         });
    },
    (error) => {
    console.log(error.message);
    if (error.status === 403) { this.g.onLoggedout(); }
    });
   }

 getPacientes() {
  this.agendaService.getPacientes()
        .subscribe( (resp: any) => {
            this.pacientes = resp;
            console.log('pacientes', this.pacientes);
        },
        (error) => {
        console.log(error.message);
        if (error.status === 403) { this.g.onLoggedout(); }
        });
}

// funciones de visitas 
  consultarVisitas() {
    this.visitaService.getVisitasMedicas()
    .subscribe( (resp: any) => {
      this.visitas = resp;
      // console.log('consultorios: ', resp);
      this.cargando = false;
    },
    (error) => {
    console.log(error.message);
    if (error.status === 403) { this.g.onLoggedout(); }
    });
 }
 guardar( form: NgForm ) {
  this.modal.dismissAll();
  Swal.fire({
    title: 'Espere',
    text: 'Guardando información',
    type: 'info',
    allowOutsideClick: false
  });
  Swal.showLoading();
  let peticion: Observable <any>;
  if(this.files.length > 1) {
    console.log(this.files);
    this.visita.anexos = this.files;
  }
  peticion = this.visitaService.altaVisita(this.visita);
      // console.log(this.consultorio);
      peticion.subscribe( resp => {
        
        console.log('respuesta del request ', resp);
        Swal.fire({
          title: 'Actualizo',
          text: 'Se actualizo correctamente',
          type: 'success'
        });
      },
      (error) => {
      console.log(error.message);
      if (error.status === 403) { this.g.onLoggedout(); }
      });
}

 // Drop file funciones del plugin 

 cancel() {
  this.progress = 0;
  if ( this.httpEmitter ) {
    console.log('cancelled');
    this.httpEmitter.unsubscribe();
  }
}

uploadFiles(): Subscription {
  const req = new HttpRequest<FormData>(
    'POST',
    this.url,
    this.sendableFormData, {
    reportProgress: true // responseType: 'text'
  });

  return this.httpEmitter = this.httpClient.request(req)
  .subscribe(
    event => {
      this.httpEvent = event;

      if (event instanceof HttpResponse) {
        delete this.httpEmitter;
        console.log('request done', event);
      }
    },
    error => alert('Error Uploading Files: ' + error.message)
  )}

getDate() {
  return new Date();
}

}
