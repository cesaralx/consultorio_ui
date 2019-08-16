import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RecoveryService {

  private token = localStorage.getItem('token');
    private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`
  });

  constructor(private http: HttpClient) { }

  sendRecovery(_id: string) {
   const body = {
      id: _id
    };
    return this.http.post('http://localhost:3000/users/recUsr', body);
  }

  sendRecoveryPaci(_id: string) {
    const body = {
       id: _id
     };
     return this.http.post('http://localhost:3000/paciente/recPas',  body);
   }

  getUsrByEmail(email: string) {
    const params = new HttpParams()
    .set('email', email);
    return this.http.get('http://localhost:3000/users/byEmail', {params: params});
  }

  getUserByUsr(user: string) {
    const params = new HttpParams()
    .set('user', user);
    return this.http.get('http://localhost:3000/users/byUsr', {params: params});
  }

  getPacByID(user: string) {
    const params = new HttpParams()
    .set('id', user);
    return this.http.get('http://localhost:3000/paciente/byId', {headers: this.headers, params: params});
  }

  recover(email: string) {
    //  this.getUsr(email);
  //   .subscribe( (resp: any) => {
  //     console.log(resp);
  //     // this.sendRecovery(resp._id).subscribe( (response) => {

  //     // },
  //     // (error) => {

  //     // });
  //   },
  //   (error) => {
  //   console.log(error.message);

  // });

  }
}
