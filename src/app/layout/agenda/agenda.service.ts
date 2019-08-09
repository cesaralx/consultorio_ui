import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CitaModel } from './cita.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private url = 'http://localhost:3000/citas';

  private token = localStorage.getItem('token');
  private id = localStorage.getItem('id');
  private headers = new HttpHeaders({
  'Authorization': `Bearer ${this.token}`
});

  constructor( private http: HttpClient) { }

  getCitas() {
    return this.http.get(`${this.url}`, {headers: this.headers});
  }

  getCitasByConsul(id: string) {
    const params = new HttpParams()
    .set('id', id);
    return this.http.get(`${this.url}/byConsultorio`, {headers: this.headers, params: params});
  }

  getCita( id: string ) {
    const params = new HttpParams()
    .set('id', id);
  return this.http.get(`${this.url}/byId`, {headers: this.headers, params: params});
  }

  altaCita( cita: CitaModel) {
    cita.id_usuario = this.id;
    return this.http.post(`${this.url}`, cita, {headers: this.headers});
  }

  borrarCita( id: string ) {
    const params = new HttpParams()
    .set('id', id);
    return this.http.delete(`${this.url}`, {headers: this.headers, params: params});
  }

  actualizaCita( cita: CitaModel) {
    return this.http.put(`${ this.url }?id=${cita._id}`, cita, {headers: this.headers});
    }

  getPacientes() {
    const url = `http://localhost:3000/paciente/`;
    return  this.http.get(url, {headers: this.headers});
  }

}
