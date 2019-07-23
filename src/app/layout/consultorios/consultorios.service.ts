import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ConsultorioModel } from './consultorio.model';

import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ConsultoriosService {
  private url = 'http://localhost:3000/consultorio';

  // Constructor
  constructor( private http: HttpClient) { }

  // Funciones
  getUsuarios () {
    const url = `http://localhost:3000/users/`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get( url, { headers});
}

  getConsultorios() {
    return this.http.get(`${this.url}`);
  }

  getConsultorio( id: string ) {
    const params = new HttpParams()
    .set('id', id);
  return this.http.get(`${this.url}/byId`, {params});
  }

  altaConsultorio( consultorio: ConsultorioModel) {
        return this.http.post(`${this.url}`, consultorio);
  }

  borrarConsultorio( id: string ) {
    const params = new HttpParams()
    .set('id', id);
    return this.http.delete(`${this.url}`, {params});
  }

  actualizaConsultorio(consultorio: ConsultorioModel) {
  return this.http.put(`${ this.url }?id=${consultorio._id}`, consultorio);
  }



}
