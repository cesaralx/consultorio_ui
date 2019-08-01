import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { UsuarioModel } from './usuarios.model';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { LayoutService } from '../layout.service';


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

  constructor(private usuariosService: UsuariosService,
    private modal: NgbModal) { }

  ngOnInit() {
    this.cargando = true;
    this.consultaUsuarios();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
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

   borrar( usuario: UsuarioModel) {
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
            this.consultaUsuarios();
            // this.usuarios.splice(i, 1);
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
          this.consultaUsuarios();
          Swal.fire({
            title: this.usuario.nombre,
            text: 'Se actualizo correctamente',
            type: 'success'
          });
        },
        (error) => {
        console.log(error.message);
        if (error.status === 403) { this.g.onLoggedout(); }
        });
  }

  // carga una imagen
  handleFileInput(files: FileList) {
    this.imgUrl = files.item(0);

    // crea una URL
    const tmppath = URL.createObjectURL(files[0]);
    console.log(this.imgUrl);
    this.usuario.image = tmppath;

  }

}
