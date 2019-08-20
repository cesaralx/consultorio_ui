import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

// Modelos
import { PacienteModel } from 'src/app/layout/pacientes-main/pacientes/pacientes.model';
import { ExpedientesModel } from 'src/app/layout/expedientes-main/expedientes/expedientes.model';
import { VisitaModel } from '../../layout/visita-medica/visita-medica.model';
// Servicios
import { PacientesService } from '../../layout/pacientes-main/pacientes/pacientes.service';
import { ExpedientesService } from '../../layout/expedientes-main/expedientes/expedientes.service';
import { ConsultoriosService } from 'src/app/layout/consultorios/consultorios.service';
import { RecoveryService } from 'src/app/recovery/recovery.service';
import { VisitaMedicaService } from 'src/app/layout/visita-medica/visita-medica.service';

import Swal from 'sweetalert2';
import { routerTransition } from 'src/app/router.animations';


@Component({
  selector: 'app-user-paciente',
  templateUrl: './user-paciente.component.html',
  styleUrls: ['./user-paciente.component.scss'],
  animations: [routerTransition()]
})

export class UserPacienteComponent implements OnInit {
  id: string;
  paciente = new PacienteModel();
  private paciente_id: any;
  expediente = new ExpedientesModel();
  public imagen: any;
  consultorio: any;
  cita: any;
  lastvisitas: VisitaModel [] = [];

  coinwallet: string[] = ['Datos Generales', 'Resumen de expediente'];
  selectedwallet = this.coinwallet[0];

  constructor(private route: ActivatedRoute,
              public paccientesService: PacientesService,
              public expedientesService: ExpedientesService,
              private consultoriosService: ConsultoriosService,
              private modal: NgbModal,
              private sanitizer: DomSanitizer,
              private visitaMedicaService: VisitaMedicaService,
              public router: Router,
              private recoveryService: RecoveryService) { }

 async ngOnInit() {

      this.id = localStorage.getItem('id');
      console.log(this.id);
      await this.getPacient();
      console.log('paciente', this.paciente);
      await this.getExpe();
      console.log('expediente', this.expediente);
      await this.getConsultorio();
      console.log('expediente', this.consultorio);
      await this.get3LastestVisitas();
      console.log('ultimas visitas', this.lastvisitas);
      await this.getCitaByPaciente();
      console.log('cita activa', this.cita);

  }
  open(content) {
    // console.log(this.consultorio);
    this.modal.open(content, { size: 'lg', backdrop: 'static' }).result.then((result) => {
        // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
  }

  getPacient = () => new Promise( (resolve, reject) => {
    this.paccientesService.getPaciente(this.id).subscribe( (resp: any) =>  {
      const arrb = this.toArrayBuffer(resp['image'].data);
      this.imagen  = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + this._arrayBufferToBase64(arrb));
      resolve(this.paciente = resp);
    });
  })

  getExpe = () => new Promise( (resolve, reject) => {
    this.expedientesService.getExpedienteByUsr(this.paciente._id).subscribe( (resp: any) =>  {
      resolve(this.expediente = resp);
    });
  })

  getConsultorio = () => new Promise( (resolve, reject) => {
    this.consultoriosService.getConsultorio(this.expediente.consultorio_alta).subscribe( (resp: any) =>  {
      resolve(this.consultorio = resp);
    });
  })

  get3LastestVisitas = () => new Promise( (resolve, reject) => {
    this.visitaMedicaService.get3LastVisitas(this.paciente._id).subscribe( (resp: any) =>  {
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

  _arrayBufferToBase64( buffer ) {
    let binary = '';

    const bytes = new Uint8Array( buffer );
    const len = bytes.byteLength;
    console.log('lenbytes ', len);
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }



  gotoVisita () {
    this.router.navigate(['/usuario-view/consultas']);
  }

  sendEmail(paciente_id) {
    console.log(paciente_id);
    this.recoveryService.getPacByID(paciente_id).subscribe(
      res => {
        console.log(res['_id']);
        Swal.fire({
          title: 'Espere',
          text: 'Mandando Email',
          type: 'info',
          allowOutsideClick: false
        });
        Swal.showLoading();
        this.recoveryService.sendRecoveryPaci(res['_id']).subscribe(
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
            // this.isError = true;
          }
        );
    },
    error => {
      console.error(error);
    },
    );
}

}
