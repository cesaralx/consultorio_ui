import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { PacientesService } from '../../layout/pacientes-main/pacientes/pacientes.service';
import { PacienteModel } from '../../layout/pacientes-main/pacientes/pacientes.model';
import { VisitaMedicaService } from '../../layout/visita-medica/visita-medica.service';
import { VisitaModel } from 'src/app/layout/visita-medica/visita-medica.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  animations: [routerTransition()]
})
export class HistorialComponent implements OnInit {
  id: string;
  paciente = new PacienteModel();
  lastvisitas: VisitaModel [] = [];
  cita: any;

  constructor(public paccientesService: PacientesService,
              private visitaMedicaService: VisitaMedicaService,
              public router: Router) { }

  async ngOnInit() {
    this.id = localStorage.getItem('id');
    await this.getPacient();
    await this.get3LastestVisitas();
    await this.getCitaByPaciente();
  }

  getPacient = () => new Promise( (resolve, reject) => {
    this.paccientesService.getPaciente(this.id).subscribe( (resp: any) =>  {
      const arrb = this.toArrayBuffer(resp['image'].data);
      // this.imagen  = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + this._arrayBufferToBase64(arrb));
      resolve(this.paciente = resp);
    });
  })

  get3LastestVisitas = () => new Promise( (resolve, reject) => {
    this.visitaMedicaService.get3LastVisitas().subscribe( (resp: any) =>  {
      resolve(this.lastvisitas = resp);
    });
  }) 

  getCitaByPaciente = () => new Promise( (resolve, reject) => {
    this.visitaMedicaService.getVisitaMedicaByPaciente(this.paciente._id).subscribe( (resp: any) =>  {
      console.log(resp);
      resolve(this.cita = resp);
    });
  })

  toArrayBuffer(buf) {
    const ab = new ArrayBuffer(buf.length);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
  }
  gotoExpediente (paciente: PacienteModel, i: number) {
    // console.log('paciente a ver expediente', paciente);
    this.router.navigate(['usuario-view/historial' ]);
  }


}
