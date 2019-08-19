import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { PacientesService } from './pacientes.service';
import { PacienteModel } from './pacientes.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { LayoutService } from '../../layout.service';
import {Buffer} from 'buffer';

import { Router } from '@angular/router';



// sweetalert2
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

// DataTable
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  animations: [routerTransition()]

})
export class PacientesComponent implements OnInit, OnDestroy {
    // DataTable
    dtOptions: DataTables.Settings = {};
    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    dtTrigger: Subject<any> = new Subject();
    message = '';
    cargando = false;
    closeResult: string;
    paciente = new PacienteModel();
    pacientes: PacienteModel[] = [];
    private g = new LayoutService();
    imgUrl: any = null;

  constructor(private pacientesService: PacientesService,
    private modal: NgbModal,
    public router: Router) { }

  ngOnInit() {
    this.cargando = true;
    this.consultaUsuarios();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  open(content) {
    // console.log(this.consultorio);
    this.modal.open(content, { backdrop: 'static', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
  }

  consultaUsuarios() {
    this.pacientesService.getPacientes()
      .subscribe( (resp: any) => {
        this.pacientes = resp;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
        // console.log('consultorios: ', resp);
        this.cargando = false;
      },
      (error) => {
      console.log(error.message);
      if (error.status === 403) { this.g.onLoggedout(); }
      });
   }

   borrar( usuario: PacienteModel, i: number) {
    this.modal.dismissAll();
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro de que desea borrar a ${ usuario.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
     }).then( resp => {
         if ( resp.value ) {
           this.pacientesService.borrarPacientes(usuario._id).subscribe( (response: any) => {
            console.log(response);
            // this.consultaUsuarios();
            this.ngOnDestroy();
            this.ngOnInit();
           },
           (error) => {
           console.log(error.message);
           if (error.status === 403) { this.g.onLoggedout(); }
           });
         }
     });

  }

  gotoExpediente (paciente: PacienteModel, i: number) {
    // console.log('paciente a ver expediente', paciente);
    this.router.navigate(['pacientes/expediente-paciente/' + paciente._id ]);
  }

  gotoAltaExpediente () {
    // console.log('paciente a ver expediente', paciente);
    this.router.navigate(['expedientes/nuevo']);
  }

  actualizar(usuario: PacienteModel, content) {
    // this.consultorio = cons;
    this.pacientesService.getPaciente(usuario._id).subscribe( (resp: any) => {
      // console.log('Respuesta de consulta consultorio: ', resp);
      this.paciente = resp;
    },
    (error) => {
    console.log(error.message);
    if (error.status === 403) { this.g.onLoggedout(); }
    });
    this.open(content);

   }

   alta( content) {
      this.paciente = new PacienteModel();
      this.open(content);
   }

   guardar( form: NgForm) {
     let updat = false;
    this.modal.dismissAll();
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    let peticion: Observable <any>;
    if (!this.paciente._id) {
      // console.log(this.usuario.image);
      console.log('nuevo paciente');
      updat = false;
    peticion = this.pacientesService.altaPacientes(this.paciente);
    } else {
      updat = true;
      console.log('actualizar paciente');
      console.log(this.paciente);
    peticion = this.pacientesService.actualizaPacientes(this.paciente);
    }
  
        // console.log(this.consultorio);
        peticion.subscribe( resp => {
          this.ngOnDestroy();
          this.ngOnInit();
          if (updat) {
            Swal.fire({
              title: this.paciente.nombre,
              text: 'Se guardo correctamente',
              type: 'success'
            });
          } else {
            Swal.fire({
              title: this.paciente.nombre,
              text: `¿Desea dar de alta el expediente?`,
              type: 'question',
              showConfirmButton: true,
              showCancelButton: true
             }).then( resp => {
                 if ( resp.value ) {
                   this.gotoAltaExpediente();
                 }
             });

          }
        },
        (error) => {
        console.log(error.message);
        if (error.status === 403) { this.g.onLoggedout(); }
        if (error.status === 500) { Swal.fire({
          title: this.paciente.nombre,
          text: 'Usuario ya existe',
          type: 'error'
        }); }
        });
  }

    // carga una imagen
    async handleFileInput(files: FileList) {
      this.imgUrl = files.item(0);

      // crea una URL
      const tmppath = URL.createObjectURL(this.imgUrl );
      const tmppath2 =  files[0];
      console.log('imagen', this.imgUrl);
      console.log('url', tmppath);

      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    // this.usuario.image = await toBase64(tmppath2);
    const h = await toBase64(tmppath2);
    console.log(h);
    // this.usuario.image = h;
    // this.usuario.image = btoa(h.toString());
    this.paciente.image = this.toBuffer(h);
    console.log('Buffer', this.paciente.image);

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

     toArrayBuffer(buf) {
      const ab = new ArrayBuffer(buf.length);
      const view = new Uint8Array(ab);
      for (let i = 0; i < buf.length; ++i) {
          view[i] = buf[i];
      }
      return ab;
  }

  toBuffer(ab) {
    const buf = Buffer.alloc(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
  }

}
