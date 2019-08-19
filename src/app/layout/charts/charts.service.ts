import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ChartsServices {
    private url = 'http://localhost:3000';
    private token = localStorage.getItem('token');
    private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  // Constructor
  constructor( private http: HttpClient) { }

  // Funciones
  getPacientes() {
    return this.http.get(`${this.url}/paciente`, {headers: this.headers});
  }

  getPaciente( id: string ) {
    const params = new HttpParams()
    .set('id', id);
  return this.http.get(`${this.url}/paciente/byId`, {headers: this.headers, params: params});
  }

  getUsuarios () {
    const respuesta = this.http.get(`${this.url}/users`, {headers: this.headers});
    return respuesta;
  }

  getCitasxMesxConsul () {
    const respuesta = this.http.get(`${this.url}/citas/xMesxConsultorio`, {headers: this.headers});
    return respuesta; 
  }

  getCostoCitas () {
    const respuesta = this.http.get(`${this.url}/citas/costoCitas`, {headers: this.headers});
    return respuesta;
  }

  getConsultasxMesxConsul () {
    const respuesta = this.http.get(`${this.url}/visitamedica/xMesxConsultorio`, {headers: this.headers});
    return respuesta;
  }

  getConsultorios() {
    return this.http.get(`${this.url}/consultorio`, {headers: this.headers});
  }

  getCitas() {
    return this.http.get(`${this.url}/citas`, {headers: this.headers});
  }










}
