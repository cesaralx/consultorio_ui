import {  Component, OnInit , OnDestroy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import {PacientesService} from '../pacientes/pacientes.service';
import {PacienteModel} from '../pacientes/pacientes.model';

import {ExpedientesService} from '../../expedientes-main/expedientes/expedientes.service';
import {ExpedientesModel} from '../../expedientes-main/expedientes/expedientes.model';

import {ConsultoriosService} from '../../consultorios/consultorios.service';
import {VisitaMedicaService} from '../../visita-medica/visita-medica.service';
import {VisitaModel} from '../../visita-medica/visita-medica.model';

import Swal from 'sweetalert2';
import { RecoveryService } from '../../../recovery/recovery.service';

import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';
import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';




@Component({
  selector: 'app-expediente-paciente',
  templateUrl: './expediente-paciente.component.html',
  styleUrls: ['./expediente-paciente.component.scss'],
  animations: [routerTransition()]
})
export class ExpedientePacienteComponent implements OnInit, OnDestroy  {
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
     private sanitizer: DomSanitizer,
     private consultoriosService: ConsultoriosService,
     private modal: NgbModal,
     private visitaMedicaService: VisitaMedicaService,
     public router: Router,
     private recoveryService: RecoveryService,
     ) { }

  ngOnInit() {
    this.paciente_id = this.route.params.subscribe(async params => {
      this.id = params.id;
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

   });
  }

  open(content) {
    // console.log(this.consultorio);
    this.modal.open(content, { size: 'lg', backdrop: 'static' }).result.then((result) => {
        // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
  }

  // abre modal para anexos
  alta( content) {
    // this.paciente = new PacienteModel();
    this.open(content);
 }

  getPacient = () => new Promise( (resolve, reject) => {
    this.paccientesService.getPaciente(this.id).subscribe( (resp: any) =>  {
      if (resp.image != null) {
        const arrb = this.toArrayBuffer(resp['image'].data);
        this.imagen  = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + this._arrayBufferToBase64(arrb));
      } else {
        this.imagen = '../../../../assets/images/userDefault.png';
      }
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


  ngOnDestroy() {
    this.paciente_id.unsubscribe();
  }

  gotoVisita () {
    this.router.navigate(['pacientes/consultas-medicas/' + this.id]);
  }

  editaExpe = () => {
    this.router.navigate(['expedientes/buscar/'], {queryParams: {expedienteId: this.expediente._id}} );
  }

  gotoVisitaMEdica = () => {
    this.router.navigate(['visita-medica/'], {queryParams: {citaID: this.cita._id}} );
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
