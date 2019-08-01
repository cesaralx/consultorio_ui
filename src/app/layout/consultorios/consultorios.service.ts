import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ConsultorioModel } from './consultorio.model';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConsultoriosService {
  private url = 'http://localhost:3000/consultorio';


    private token = localStorage.getItem('token');
    private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  // Constructor
  constructor( private http: HttpClient) { }

  // Funciones
   getUsuarios  () {
    const url = `http://localhost:3000/users/`;
    const respuesta = this.http.get(url, {headers: this.headers});
    return respuesta;
}

  getConsultorios() {
    return this.http.get(`${this.url}`, {headers: this.headers});
  }

  getConsultorio( id: string ) {
    const params = new HttpParams()
    .set('id', id);
  return this.http.get(`${this.url}/byId`, {headers: this.headers, params: params});
  }

  altaConsultorio( consultorio: ConsultorioModel) {
        return this.http.post(`${this.url}`, consultorio, {headers: this.headers});
  }

  borrarConsultorio( id: string ) {
    const params = new HttpParams()
    .set('id', id);
    return this.http.delete(`${this.url}`, {headers: this.headers, params: params});
  }

  actualizaConsultorio(consultorio: ConsultorioModel) {
  return this.http.put(`${ this.url }?id=${consultorio._id}`, consultorio, {headers: this.headers});
  }





}
