import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {



  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.post('http://localhost:3000/tokens', {
      username: username,
      password: password,
    });
  }

  getUsr(username: string) {
    const params = new HttpParams()
    .set('user', username);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:3000/users/byUsr', {headers: headers, params: params});
  }

  getUsrExt(username: string) {
    const params = new HttpParams()
    .set('user', username);
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:3000/paciente/byUsr', {headers: headers, params: params});
  }

}
