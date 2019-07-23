import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ConsultorioModel } from './consultorio.model';

import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ConsultoriosService {
  private url = 'http://localhost:3000/consultorio';

  constructor( private http: HttpClient) { }

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
