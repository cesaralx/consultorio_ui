import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UsuarioModel } from './usuarios.model';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url = 'http://localhost:3000/users';


    private token = localStorage.getItem('token');
    private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  // Constructor
  constructor( private http: HttpClient) { }

  // Funciones
  getUsuarios() {
    return this.http.get(`${this.url}`, {headers: this.headers});
  }

  getUsuario( id: string ) {
    const params = new HttpParams()
    .set('id', id);
  return this.http.get(`${this.url}/byId`, {headers: this.headers, params: params});
  }

  altaUsuarios( usuarios: UsuarioModel) {
        return this.http.post(`${this.url}`, usuarios, {headers: this.headers});
  }

  borrarUsuarios( id: string ) {
    const params = new HttpParams()
    .set('id', id);
    return this.http.delete(`${this.url}`, {headers: this.headers, params: params});
  }

  actualizaUsuarios(usuarios: UsuarioModel) {
  return this.http.put(`${ this.url }?id=${usuarios._id}`, usuarios, {headers: this.headers});
  }





}
