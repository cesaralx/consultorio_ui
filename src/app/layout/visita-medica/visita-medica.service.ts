import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { VisitaModel } from './visita-medica.model';

@Injectable({
  providedIn: 'root'
})
export class VisitaMedicaService {
  private url = 'http://localhost:3000/visitamedica';

  private token = localStorage.getItem('token');
    private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });
  constructor(private http: HttpClient) { }

   // Funciones

   getVisitasMedicas() {
    return this.http.get(`${this.url}`, {headers: this.headers});
  }
   getVisitaMedica( id: string ) {
    const params = new HttpParams()
    .set('id', id);
  return this.http.get(`${this.url}/byId`, {headers: this.headers, params: params});
  }

  altaConsultorio( visita: VisitaModel) {
    return this.http.post(`${this.url}`, visita, {headers: this.headers});
  }

  borrarConsultorio( id: string ) {
    const params = new HttpParams()
    .set('id', id);
    return this.http.delete(`${this.url}`, {headers: this.headers, params: params});
  }

  actualizaConsultorio(visita: VisitaModel) {
    return this.http.put(`${ this.url }?id=${visita._id}`, visita, {headers: this.headers});
  }
}
