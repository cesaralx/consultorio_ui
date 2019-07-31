import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })

 export class LayoutService {

    constructor() { }

     onLoggedout() {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        localStorage.removeItem('isLoggedinExternal');
    }

}
