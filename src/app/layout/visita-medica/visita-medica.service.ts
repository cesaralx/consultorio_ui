import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { VisitaModel } from './visita-medica.model';

@Injectable({
  providedIn: 'root'
})
export class VisitaMedicaService {
  private url = 'http://localhost:3000/visitamedica';

  private token = localStorage.getItem('token');
  private id = localStorage.getItem('id');
    private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });
  constructor(private http: HttpClient) { }

   // Funciones

   getVisitasMedicas() {
    return this.http.get(`${this.url}`, {headers: this.headers});
  }

  get3LastVisitas() {
    return this.http.get(`${this.url}/lastVisitas`, {headers: this.headers});
  }

   getVisitaMedica( id: string ) {
    const params = new HttpParams()
    .set('id', id);
  return this.http.get(`${this.url}/byId`, {headers: this.headers, params: params});
  }

  altaVisita( visita: VisitaModel) {
    visita.id_usuario = this.id;
    console.log('visitas anexo service', visita.anexos);
    return this.http.post(`${this.url}`, visita, {headers: this.headers});
  }

  borrarVisita( id: string ) {
    const params = new HttpParams()
    .set('id', id);
    return this.http.delete(`${this.url}`, {headers: this.headers, params: params});
  }

  actualizaVisita(visita: VisitaModel) {
    return this.http.put(`${ this.url }?id=${visita._id}`, visita, {headers: this.headers});
  }
}
