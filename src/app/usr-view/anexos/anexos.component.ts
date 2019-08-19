import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { VisitaMedicaService } from '../../layout/visita-medica/visita-medica.service';
import { VisitaModel } from '../../layout/visita-medica/visita-medica.model';
import { LayoutService } from '../../layout/layout.service';
import { Observable } from 'rxjs';
import {Buffer} from 'buffer';

@Component({
  selector: 'app-anexos',
  templateUrl: './anexos.component.html',
  styleUrls: ['./anexos.component.scss']
})
export class AnexosComponent implements OnInit {
  files: File[] = [];
  private paciente_id: any;
  id: string;
  visita = new VisitaModel();
  private g = new LayoutService();
  ver : boolean = false;
  ruta: any = null;
  extension: any[] = null;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private visitaService: VisitaMedicaService) { }

 async ngOnInit() {
    this.paciente_id = this.activatedRoute.params.subscribe(async params => {
      this.id = params.id;
      console.log(this.id);
      await this.getConsultaByid();
     });
  }

   // funciones de visitas
   getConsultaByid = () => new Promise((resolve , reject) => {
    this.visitaService.getVisitaMedica(this.id) .subscribe( async  (resp: any) => {
    this.visita = resp;
    let contador = 0;
    this.files = [];
    this.extension = [];
    this.visita.anexos.forEach(element => {
        const tipo = this.visita.tipoFile[contador];
        console.log('type de archivo', tipo);
        console.log('actualizar element', element);
        const arrb = this.toArrayBuffer(element.data);
        const blob = new Blob([arrb], {type: tipo});
        const fil = new File([blob], this.visita.filenames[contador]);
        const spli = this.visita.filenames[contador].split('.', 2);
        this.extension.push(spli[1]);
        this.files.push(fil);
        contador++;
      });
      console.log('Archivos', this.files);
      resolve(this.visita);
    }, (error) => {
    console.log(error.message);
    if (error.status === 403) { reject(this.g.onLoggedout()); }
    });
 })

 toArrayBuffer(buf) {
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
      view[i] = buf[i];
  }
  return ab;
}


descargar(archivo: File) {
  if(navigator.msSaveBlob) {

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

async uploadFile(event) {
  await this.recorrerFile(event);
  // await this.convertirFile(archivos);
  console.log('visita: ', this.visita);
}


recorrerFile = (event: any) => new Promise((resolve, reject)=>{

 for (let index = 0; index < event.length; index++) {
   const element = event[index];
    // archivos.push(element);
    this.handleFileInput(element);
 }
 resolve(true);
})

convertirFile =(fileList: File[]) => new Promise((resolve, reject ) => {
   console.log('Lista de archivos: ', fileList);
   let contadorcito = 0;
   fileList.forEach(element => {
   this.handleFileInput(element);
   contadorcito++;
   });
   resolve(contadorcito === fileList.length);
})
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

this.visita.filenames.push(file.name);
this.visita.anexos.push(this.toBuffer(h));
this.visita.tipoFile.push(file.type);
this.guardar();

}

toBuffer(ab) {
 const buf = Buffer.alloc(ab.byteLength);
 const view = new Uint8Array(ab);
 for (let i = 0; i < buf.length; ++i) {
     buf[i] = view[i];
 }
 return buf;
 }

 guardar() {
  let peticion: Observable <any>;

   console.log('se manda visita a guardad', this.visita);
   peticion = this.visitaService.actualizaVisita(this.visita);
      // console.log(this.consultorio);
      peticion.subscribe( resp => {
        this.ngOnInit();
      },
      (error) => {
      console.log(error.message);
      if (error.status === 403) { this.g.onLoggedout(); }
      });
 
    }

}
