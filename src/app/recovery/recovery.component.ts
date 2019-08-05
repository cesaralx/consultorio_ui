import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecoveryService } from './recovery.service';
import { routerTransition } from '../router.animations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
  animations: [routerTransition()],
  providers: [RecoveryService]
})
export class RecoveryComponent implements OnInit {

  isSended: Boolean = false;
  isError: Boolean = false ;
  constructor(public router: Router, private recoveryService: RecoveryService) { }

  ngOnInit() {

  }

  sendEmail(data) {

    console.log(data.email.value);
    this.recoveryService.getUsrByEmail(data.email.value).subscribe(
        res => {
          console.log(res['_id']);
          Swal.fire({
            title: 'Espere',
            text: 'Mandando Email',
            type: 'info',
            allowOutsideClick: false
          });
          Swal.showLoading();
          this.recoveryService.sendRecovery(res['_id']).subscribe(
            response => {
              Swal.fire({
                title: 'Correcto',
                text: 'Se mando email con datos de inicio de sesion',
                type: 'success'
              });
              console.log(response);

            },
            error => {
              console.error(error);
              this.isError = true;
            }
          );

        //   localStorage.setItem('token', res['token']);
        //   if (res['token'] === undefined) {this.navigateErr(); } else {
        //   if (res['type'] === 'user') {this.navigateOk(); } else { this.navigateOkExterno(); }
        // }
      },
      error => {
        console.error(error);
      },
    //   () => this.navigateOk()
      );
}

}
