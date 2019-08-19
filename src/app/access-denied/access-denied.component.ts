import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.navigateLogin();
    }, 2000);
  }

  navigateLogin() {
    // localStorage.setItem('isLoggedin', 'false');
    this.router.navigateByUrl('/login');
    }

}
