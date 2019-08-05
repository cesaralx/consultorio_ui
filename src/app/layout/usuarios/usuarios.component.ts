import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { UsuarioModel } from './usuarios.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { LayoutService } from '../layout.service';
import {Buffer} from 'buffer';



// sweetalert2
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

// DataTable
import { Subject } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnDestroy, OnInit {

  // DataTable
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject();

  cargando = false;
  closeResult: string;
  usuario = new UsuarioModel();
  usuarios: UsuarioModel[] = [];
  private g = new LayoutService();
  imgUrl: any = null;
  datita ;

  constructor(private usuariosService: UsuariosService,
    private modal: NgbModal) { }

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
    this.modal.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
  }

  consultaUsuarios() {
    this.usuariosService.getUsuarios()
      .subscribe( (resp: any) => {
        this.usuarios = resp;
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

   borrar( usuario: UsuarioModel, i: number) {
    this.modal.dismissAll();
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro de que desea borrar a ${ usuario.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
     }).then( resp => {
         if ( resp.value ) {
           this.usuariosService.borrarUsuarios(usuario._id).subscribe( (response: any) => {
            console.log(response);
            // this.consultaUsuarios();
            this.usuarios.splice(i, 1);
           },
           (error) => {
           console.log(error.message);
           if (error.status === 403) { this.g.onLoggedout(); }
           });
         }
     });
  }

  actualizar(usuario: UsuarioModel, content) {
    // this.consultorio = cons;
    this.usuariosService.getUsuario(usuario._id).subscribe( (resp: any) => {
      // console.log('Respuesta de consulta consultorio: ', resp);
      this.usuario = resp;
    },
    (error) => {
    console.log(error.message);
    if (error.status === 403) { this.g.onLoggedout(); }
    });
    this.open(content);
   }

   alta( content) {
      this.usuario = new UsuarioModel();
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
    if (!this.usuario._id) {
      // console.log(this.usuario.image);
    peticion = this.usuariosService.altaUsuarios(this.usuario);
    } else {
      console.log('actualizar');
    peticion = this.usuariosService.actualizaUsuarios(this.usuario);
    }
        // console.log(this.consultorio);
        peticion.subscribe( resp => {
          this.ngOnDestroy();
          this.ngOnInit();
          Swal.fire({
            title: this.usuario.nombre,
            text: 'Se actualizo correctamente',
            type: 'success'
          });
        },
        (error) => {
        console.log(error.message);
        if (error.status === 403) { this.g.onLoggedout(); }
        if (error.status === 500) {Swal.fire({
            title: this.usuario.nombre,
            text: 'Usario ya existe',
            type: 'error'
          });
        }
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
  this.usuario.image = this.toBuffer(h);
  console.log('Buffer', this.usuario.image);

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
