import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ExpedientesModel } from './expedientes.model';

@Injectable({
    providedIn: 'root'
  })
  export class ExpedientesService {
    private url = 'http://localhost:3000/expedientes';

    private token = localStorage.getItem('token');
    private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

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
    const url = 'http://localhost:3000/consultorio/';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get( url, { headers});
}

getPacientes() {
  const url = 'http://localhost:3000/paciente';
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get( url, { headers});
}

getPaciente(id) {
  const url = 'http://localhost:3000/paciente/byId';
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  const params = {
    id: id
  };
  return this.http.get( url, { headers: headers, params: params});
}

    getexpedientes() {
      return this.http.get(`${this.url}`);
    }

    getExpediente( id: string ) {
      const params = new HttpParams()
      .set('id', id);
    return this.http.get(`${this.url}/byId`, {headers: this.headers, params: params});
    }

    getExpedienteByUsr( id: string ) {
      const params = new HttpParams()
      .set('id', id);
    return this.http.get(`${this.url}/byPaciente`, {headers: this.headers, params: params});
    }

    altaExpediente( expediente: ExpedientesModel) {
          return this.http.post(`${this.url}`, expediente, {headers: this.headers});
    }

    borrarExpediente( id: string ) {
      const params = new HttpParams()
      .set('id', id);
      return this.http.delete(`${this.url}`, {headers: this.headers, params: params});
    }

    actualizaExpediente(expediente: ExpedientesModel) {
    return this.http.put(`${ this.url }?id=${expediente._id}`, expediente, {headers: this.headers});
    }
  }
