import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../usuarios/usuarios.model';
import { UsuariosService } from '..//usuarios/usuarios.service';

import { LayoutService } from '../layout.service';

import { DomSanitizer } from '@angular/platform-browser';
import {Buffer} from 'buffer';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {



  private g = new LayoutService();
  usuario = new UsuarioModel();
  public imagen: any;

  constructor(
    private usuariosService: UsuariosService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.consultaUsuario();

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

   consultaUsuario() {
    this.usuariosService.getUsuario(localStorage.getItem('id'))
      .subscribe( async (resp: any) => {
        console.log(resp);
        // console.log(resp['image']);
        this.usuario = resp;

      const arrb = this.toArrayBuffer(resp['image'].data);
      //  console.log( 'arrb', this._arrayBufferToBase64(arrb));

        this.imagen  = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + this._arrayBufferToBase64(arrb));
        // this.imagen = resp['image'];
      },
      (error) => {
      console.log(error.message);
      if (error.status === 403) { this.g.onLoggedout(); }
      });
   }

}
