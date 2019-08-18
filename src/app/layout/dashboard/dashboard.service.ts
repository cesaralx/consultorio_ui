import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

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

getAllPacientes() {
  return this.http.get(`http://localhost:3000/paciente`, {headers: this.headers});
  }

  getConsultorios() {
    return this.http.get(`${this.url}`, {headers: this.headers});
  }

  getCitas() {
    return this.http.get(`http://localhost:3000/citas`, {headers: this.headers});
  }

  getVisitas() {
    return this.http.get(`http://localhost:3000/visitamedica`, {headers: this.headers});
  }

  getExpedientes() {
    return this.http.get(`http://localhost:3000/expedientes`, {headers: this.headers});
  }

  getConsultorio( id: string ) {
    const params = new HttpParams()
    .set('id', id);
  return this.http.get(`${this.url}/byId`, {headers: this.headers, params: params});
  }

 

  borrarConsultorio( id: string ) {
    const params = new HttpParams()
    .set('id', id);
    return this.http.delete(`${this.url}`, {headers: this.headers, params: params});
  }






}
