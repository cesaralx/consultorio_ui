import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class NotificacionService {
    private url = 'http://localhost:3000';

    private token = localStorage.getItem('token');
    private id_consultorio = localStorage.getItem('id_consultorio');
      private headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    constructor(private http: HttpClient) { }

     // Funciones

    //  getCitas() {
    //   return this.http.get(`${this.url}`, {headers: this.headers});
    // }
    getAllPacientes() {
    return this.http.get(`${this.url}/paciente`, {headers: this.headers});
    }

    getCitasByConsultorio( id: string ) {
        const params = new HttpParams()
        .set('id', id);
      return this.http.get(`${this.url}/citas/byConsultorioToday`, {headers: this.headers, params: params});
    }
  }
