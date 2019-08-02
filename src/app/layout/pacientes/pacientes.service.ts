import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PacienteModel } from './pacientes.model';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private url = 'http://localhost:3000/paciente';


    private token = localStorage.getItem('token');
    private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  // Constructor
  constructor( private http: HttpClient) { }

  // Funciones
  getPacientes() {
    return this.http.get(`${this.url}`, {headers: this.headers});
  }

  getPaciente( id: string ) {
    const params = new HttpParams()
    .set('id', id);
  return this.http.get(`${this.url}/byId`, {headers: this.headers, params: params});
  }

  altaPacientes( pacientes: PacienteModel) {
        return this.http.post(`${this.url}`, pacientes, {headers: this.headers});
  }

  borrarPacientes( id: string ) {
    const params = new HttpParams()
    .set('id', id);
    return this.http.delete(`${this.url}`, {headers: this.headers, params: params});
  }

  actualizaPacientes(pacientes: PacienteModel) {
  return this.http.put(`${ this.url }?id=${pacientes._id}`, pacientes, {headers: this.headers});
  }





}
