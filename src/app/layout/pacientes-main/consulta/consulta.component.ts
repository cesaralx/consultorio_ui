import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';

import {VisitaMedicaService} from '../../visita-medica/visita-medica.service';
// servicios
import { LayoutService, lenguaje } from '../../layout.service';
import {VisitaModel} from '../../visita-medica/visita-medica.model';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {
  files: File[] = [];
  private paciente_id: any;
  id: string;
  visita = new VisitaModel();
  private g = new LayoutService();
  ver : boolean = false;
  ruta: any = null;


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private visitaService: VisitaMedicaService) { }

 async ngOnInit() {
    this.paciente_id = this.activatedRoute.params.subscribe(async params => {
      this.id = params.id;
   await this.getConsultaByid();

   });
  }

     // funciones de visitas
     getConsultaByid = () => new Promise((resolve , reject) => {
      this.visitaService.getVisitaMedica(this.id) .subscribe( async  (resp: any) => {
      this.visita = resp;
      let contador = 0;
      this.files = [];
      this.visita.anexos.forEach(element => {
          const tipo = this.visita.tipoFile[contador];
          console.log('type de archivo ', tipo);
          console.log('actualizar element', element);
          const arrb = this.toArrayBuffer(element.data);
          const blob = new Blob([arrb], {type: tipo});
          const fil = new File([blob], this.visita.filenames[contador]);

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
  preview(archivo: File) {
    if(navigator.msSaveBlob) {

      navigator.msSaveBlob(archivo, archivo.name);
    } else {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(archivo);
      link.setAttribute('visibility', 'hidden');
      document.body.appendChild(link);
      link.click();
 }
}

 

}
