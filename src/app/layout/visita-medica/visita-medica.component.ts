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
import {Buffer} from 'buffer';


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
  editable = false;

  //  variables que se necesitan para drop file
  accept = '*';
  files: File[] = [];
  progress: number;
  // url = 'https://evening-anchorage-3159.herokuapp.com/api/'
  url = 'https://jquery-file-upload.appspot.com/';
  hasBaseDropZoneOver = false;
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
//
  docUrl: any[];


  private g = new LayoutService();

  constructor( private visitaService: VisitaMedicaService,
              private agendaService: AgendaService,
              private consultoriosService: ConsultoriosService,
              private modal: NgbModal,
              public httpClient: HttpClient) { }

  async ngOnInit() {
    this.cargando = true;
    await this.getConsultorios();
    await this.getPacientes();
    await this.getCitas();
  }
// Funciones del modal
  open(content) {
    this.modal.open(content, { backdrop: 'static', size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
}

  alta( content) {
    this.visita = new VisitaModel();
    this.open(content);
  }

  async  citaVisitaMedica(c: CitaModel , content) {
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

  completeCita = () => new Promise((resolve, reject) => {
    this.cita.status = 'completada';
    console.log(this.cita);
    this.agendaService.actualizaCita(this.cita).subscribe( resp => {
      resolve(true);
    }) ;
  })

// Funciones para traerese registros de consultas y pacientes
  getConsultorios = () => new Promise((resolve, reject) => {
    this.consultoriosService.getConsultorios()
          .subscribe(  (resp: any) => {
          resolve(this.consultorios = resp);

          },
          (error) => {
          console.log(error.message);
          if (error.status === 403) { reject(this.g.onLoggedout()); }
          }

          );
   })

  // getCitas = () => new Promise((resolve, reject) => {
  //   this.agendaService.getCitas()
  //       .subscribe(  (resp: any) => {
  //       this.citas = resp;
  //       if (this.citas === null) { return []; }
  //       this.cargando = false;
  //        this.citas.forEach( cita => {
  //          const obj = this.pacientes.find(res => res._id === cita.id_paciente);
  //          if (obj != null) {
  //           cita.nombrePaciente = obj.nombre;
  //          } else {
  //            cita.nombrePaciente = 'Nombre no valido';
  //          }
  //          const resultado = this.consultorios.find(busca => busca._id === cita.id_consultorio);
  //          if (resultado != null) {
  //           cita.nombreConsultorio = resultado.nombre;
  //          } else {
  //            cita.nombreConsultorio = 'Consulta no valido';
  //          }
  //         //  console.log('todas:', cita);
  //          if (cita.status === 'completada') {
  //             console.log('Completada:', cita);
  //             const index: number = this.citas.indexOf(cita);
  //             if (index !== -1) {
  //                 this.citas.splice(index);
  //             }
  //           }
  //        });
  //        console.log('Citas medicas:', this.citas);
  //        resolve(true);
  //   },
  //   (error) => {
  //   console.log(error.message);
  //   if (error.status === 403) { this.g.onLoggedout();  }

  //   });
  //  })

    getCitas = () => new Promise((resolve, reject) => {
    this.agendaService.getCitas()
        .subscribe(  (resp: any) => {
        if (resp === null) { return []; }
        this.cargando = false;
         resp.forEach( cita => {
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
          //  console.log('todas:', cita);
           if ( (cita.status !== 'completada') && (cita.status !== 'cancelada') ) {
              this.citas.push(cita);
            }
         });
         console.log('Citas medicas:', this.citas);
         resolve(true);
    },
    (error) => {
    console.log(error.message);
    if (error.status === 403) { this.g.onLoggedout();  }
    });
   })

 getPacientes = () => new Promise ((resolve, reject) => {
  this.agendaService.getPacientes()
        .subscribe(  (resp: any) => {
           resolve(this.pacientes = resp);

        },
        (error) => {
        console.log(error.message);
        if (error.status === 403) { reject(this.g.onLoggedout()); }
        });
})

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

  async guardar( form: NgForm ) {
  this.modal.dismissAll();
  Swal.fire({
    title: 'Espere',
    text: 'Guardando información',
    type: 'info',
    allowOutsideClick: false
  });
  Swal.showLoading();
  let peticion: Observable <any>;
  if (this.files.length > 0) {

   await this.guardarArchivos();

  }
  peticion = this.visitaService.altaVisita(this.visita);
      // console.log(this.consultorio);
      peticion.subscribe( async resp => {
        await this.completeCita();
        console.log('respuesta del request ', resp);
        Swal.fire({
          title: 'Actualizo',
          text: 'Se actualizo correctamente',
          type: 'success'
        });
        this.citas = [];
        this.getCitas();
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
  ); }

getDate() {
  return new Date();
}

async handleFileInput(file: File, contador: any) {

    const tmppath2 =  file;

    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });

  // this.usuario.image = await toBase64(tmppath2);
      const h = await toBase64(tmppath2);
      console.log('archivo en base 64', h);

      this.visita.filenames.push(file.name);
      this.visita.anexos.push(this.toBuffer(h));
      this.visita.tipoFile.push(file.type);
      // console.log('Buffer', this.usuario.image);

  }

toBuffer(ab) {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
      buf[i] = view[i];
  }
  return buf;
}

guardarArchivos = () => new Promise((resolve, reject) => {
  let contadorcito = 0;
  this.files.forEach(element => {
    this.handleFileInput(element, contadorcito); contadorcito++;
  });
  resolve(true);
})




}
