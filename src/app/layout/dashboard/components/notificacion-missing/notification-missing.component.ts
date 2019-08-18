import { Component, OnInit } from '@angular/core';
import { NotificacionMissignService } from './notificacion-missing.service';
import { LayoutService } from '../../../layout.service';
import { Router } from '@angular/router';
import { CitaModel, PacientModel } from '../../../agenda/cita.model';

// sweetalert2
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-notification-missing',
    templateUrl: './notification-missing.component.html',
    styleUrls: ['./notification-missing.component.scss']
})

export class NotificationMissingComponent implements OnInit {
  private g = new LayoutService();
  private id_consultorio = localStorage.getItem('id_consultorio');
  citas: CitaModel[] = [];
  pacientes: PacientModel[] = [];
  pacientesNum: any;


  constructor(
      private notificacionService: NotificacionMissignService,
      public router: Router
      ) { }

  async ngOnInit() {
      await this.cargaCitas();
      await this.cargaPacientes();
      await this.fill();
    }

  cargaCitas = () =>  new Promise((resolve, reject) => {
    this.notificacionService.getCitasByConsultorioMissing(this.id_consultorio)
    .subscribe( async (resp: any) => {
        // console.log('citas de consultorio para hoy', resp);
        resolve(this.citas = resp);
      },
      (error) => {
      console.log(error.message);
      if (error.status === 403) { this.g.onLoggedout(); }
      });
  })

  cargaPacientes = () =>  new Promise((resolve, reject) => {
    this.notificacionService.getAllPacientes()
    .subscribe( async (resp: any) => {
        // console.log('citas de consultorio para hoy', resp);
        resolve (this.pacientes = resp);
      },
      (error) => {
      console.log(error.message);
      if (error.status === 403) { this.g.onLoggedout(); }
      });
  })

  fill = () => new Promise((resolve, reject) => {
    this.citas.forEach( cita => {
      const obj = this.pacientes.find(res => res._id === cita.id_paciente);
      if (obj != null) {
      cita.nombrePaciente = obj.nombre;
      }
    });
    resolve(true);
  })



  gotoExpediente (paciente: any) {
    // console.log('paciente a ver expediente', paciente);
    this.router.navigate(['pacientes/expediente-paciente/' + paciente ]);
  }

}
