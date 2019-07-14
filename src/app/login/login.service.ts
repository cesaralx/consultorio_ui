import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

    return this.http.get('http://localhost:3000/users/byUsr', {params});
  }

}
