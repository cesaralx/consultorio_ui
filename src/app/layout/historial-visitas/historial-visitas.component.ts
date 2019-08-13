import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest,
  HttpResponse, HttpEvent } from '@angular/common/http';

import { Subscription } from 'rxjs';

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

import { DomSanitizer } from '@angular/platform-browser';

// sweetalert2
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import {Buffer} from 'buffer';


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
  editable: boolean = false;
  myBlob: Blob = new Blob();
    //  variables que se necesitan para drop file
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

  constructor( private visitaService: VisitaMedicaService,
               private agendaService: AgendaService,
               private consultoriosService: ConsultoriosService,
               private modal: NgbModal,
               public httpClient: HttpClient,
               private sanitizer: DomSanitizer) { }

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

    this.visitaService.getVisitaMedica(visita._id).subscribe( (resp: any) => {
    this.visita = resp;
    console.log('visita medica', this.visita);
    this.editable = true;
    let contador = 0;
    this.files = [];
    this.visita.anexos.forEach(element => {

        console.log('actualizar element', element);
        const arrb = this.toArrayBuffer(element.data);
        const blob = new Blob([arrb], {type: this.visita.tipoFile[contador]});
      
        const fil = new File([blob], this.visita.filenames[contador]);
        this.files.push(fil);
        contador++;


      });

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

async handleFileInput(file: File) {

    const tmppath2 =  file;
    const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const h = await toBase64(tmppath2);
console.log(h);
this.visita.anexos.push(this.toBuffer(h));


}

toBuffer(ab) {
const buf = Buffer.alloc(ab.byteLength);
const view = new Uint8Array(ab);
for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
}
return buf;
}

guardarArchivos(){
this.files.forEach(element => {
  this.handleFileInput(element);
});

}

toArrayBuffer(buf) {
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
  }
  return ab;
}

_arrayBufferToBase64( buffer ) {
let binary = '';
const bytes = new Uint8Array( buffer );
const len = bytes.byteLength;
console.log('lenbytes ', len);
for (let i = 0; i < len; i++) {
  binary += String.fromCharCode( bytes[ i ] );
}
return window.btoa( binary );
}

descargar(archivo: File) {
  if(navigator.msSaveBlob){

    navigator.msSaveBlob(archivo, archivo.name);
  } else {
    const link = document.createElement('a');

    link.href = URL.createObjectURL(archivo);

    link.setAttribute('visibility','hidden');
    link.download = archivo.name;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}


}
