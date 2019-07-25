import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CitaModel } from './cita.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private url = 'http://localhost:3000/citas';

  constructor( private http: HttpClient) { }

  getCitas() {
    return this.http.get(`${this.url}`);
  }

  getCita( id: string ) {
    const params = new HttpParams()
    .set('id', id);
  return this.http.get(`${this.url}/byId`, {params});
  }

  altaCita( cita: CitaModel) {
    return this.http.post(`${this.url}`, cita);
  }

  borrarCita( id: string ) {
    const params = new HttpParams()
    .set('id', id);
    return this.http.delete(`${this.url}`, {params});
  }

  actualizaCita( cita: CitaModel) {
    return this.http.put(`${ this.url }?id=${cita._id}`, cita);
    }

}
