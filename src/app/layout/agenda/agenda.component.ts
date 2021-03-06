import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Full calendar
import { EventInput, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import esLocale from '@fullcalendar/core/locales/es';
// other libs
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
// Modelos
import { ConsultorioModel } from '../consultorios/consultorio.model';
import { CitaModel, PacientModel } from './cita.model';
// Servicios
import { AgendaService } from './agenda.service';
import { ConsultoriosService } from '../consultorios/consultorios.service';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService, lenguaje } from '../layout.service';
import { getLocaleTimeFormat } from '@angular/common';
import { routerTransition } from '../../router.animations';

import * as moment from 'moment';



@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  animations: [routerTransition()]
})
export class AgendaComponent implements OnInit {
  // Variables utilizadas
  time;
  title = '';
  eliminar = false;
  pacientes: PacientModel [] = [];
  cita = new CitaModel();
  citas: CitaModel[] = [];
  consultorios: ConsultorioModel [] = [];
  args: any ;
  // Variable para el uso del modal
  closeResult: string;
  // Carga de datos del plugin fullcalendar
  calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, bootstrapPlugin]; // important!
  calendarEvents: EventInput;
  calEvents: EventInput[] = [];
  // locale = esLocale;
  estatus = [ {color: '##00FF7F', status: 'confirmada'},
              {color: '#87CEEB', status: 'nueva'},
              {color: '#BC8F8F', status: 'reagendada'},
              {color: '#FA8072', status: 'cancelada'},
            ];

  idconsultorioUsr = localStorage.getItem('id_consultorio');
  consultorioMostrar = this.idconsultorioUsr;
  private g = new LayoutService();

  constructor(private translate: TranslateService,
              private modal: NgbModal,
              private agendaService: AgendaService,
              private consultoriosService: ConsultoriosService,
              ) { }

  async ngOnInit() {
    await this.getPacientes();
    await this.getConsultorios();
    await this.getCitas();
   // this.calendarEvents = this.calEvents;
  }

  handleDateClick(arg, content) {
    const g = moment(arg.dateStr).toDate();

    this.open(content);
    this.eliminar = true;
    this.title = 'Nueva';
    this.cita = new CitaModel();
    this.cita.fecha = moment(arg.dateStr).format('YYYY-MM-DD[T]HH:mm');
    this.cita.hour_start = moment(g).format('YYYY-MM-DD[T]HH:mm');
    this.args = arg;
    console.log('args',  arg.dateStr );
    console.log('hora minuto', moment(g).format('HH:mm'));
   }

   handleDateSelect(arg, content) {
    this.time = {hour: 13, minute: 30};
    // this.open(content);
    this.open(content);
    this.eliminar = true;
    this.title = 'Nueva';
    this.cita = new CitaModel();
    this.cita.fecha = arg;
    this.cita.hour_start = moment(arg.start).format(' hh:mm');
    this.cita.hour_end = moment(arg.end).format(' hh:mm');
    this.args = arg;
    console.log('select:', arg);
    console.log('rango:', moment(arg.start).utcOffset(0).format('yyyy/MM/dd HH:mm') , arg.end); // date=date.format('MM/DD/YYYY');
   }

   reloadCalendar(args) {
    console.log('argumentitos', args.srcElement.value);
    this.consultorioMostrar = args.srcElement.value;
    this.ngOnInit();
   }

open(content) {
  this.modal.open(content, {size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {

  });
}
eventClick(arg, content) {
  this.args = arg;
   console.log('argumentitos', this.args);
   this.title = 'Modificación de cita';
   this.eliminar = false;
   // console.log(arg.event);
   this.agendaService.getCita(arg.event.id).subscribe( (resp: any) => {
   // console.log('Respuesta de agenda', resp);
    this.cita = resp ;
    this.cita.fecha = moment(this.cita.fecha).format('YYYY-MM-DD[T]HH:mm');

  },
  (error) => {
  console.log(error.message);
  if (error.status === 403) { this.g.onLoggedout(); }
  });
  this.open(content);
 }

 getPacientes = () => new Promise( (resolve, reject) => {
  this.agendaService.getPacientes()
        .subscribe( (resp: any) => {
          console.log('pacientes', resp);
           resolve( this.pacientes = resp);
        },
        (error) => {
        console.log(error.message);
        reject(error);
        if (error.status === 403) { this.g.onLoggedout(); }
        });
})


getConsultorios = ()  => new Promise( (resolve, reject) => {
  this.consultoriosService.getConsultorios()
        .subscribe( (resp: any) => {
        resolve(this.consultorios = resp);
        },
        (error) => {
        console.log(error.message);
        if (error.status === 403) { this.g.onLoggedout(); }
        reject(error);
        });
 })

  getCitas =  ()  => new Promise( (resolve, reject) => {
  this.calendarEvents = [];
  this.calEvents = [];
  // this.agendaService.getCitas()
  this.agendaService.getCitasByConsul(this.consultorioMostrar)
      .subscribe( async (resp: any) => {
       this.citas = resp;
      if (this.citas === null) { return []; }
      await this.muestraCitas();
      this.calendarEvents = this.calEvents;
      resolve(true);
  },
  (error) => {
  console.log(error.message);
  if (error.status === 403) { this.g.onLoggedout(); }
  reject(error);
  });
 })

 muestraCitas = () => new Promise((resolve, reject) => {
     this.citas.forEach( cita => {
      if (cita.status !== 'completada') {
        const resultado = this.estatus.find(busca => busca.status === cita.status);
        const obj = this.pacientes.find(res => res._id === cita.id_paciente);
          this.calEvents.push({
          id: cita._id,
          start: cita.fecha,
          title: obj.nombre,
          backgroundColor: resultado.color,
          slotDuration: '01:00:00',
          defaultTimedEventDuration: '01:00:00'
        });
      }
    resolve(true);
  });
 })

 guardar( form: NgForm ) {
  this.modal.dismissAll();
  Swal.fire({
    title: 'Espere',
    text: 'Guardando información',
    type: 'info',
    allowOutsideClick: false
  });
  Swal.showLoading();
  let peticion: Observable <any>;
  // this.cita.fecha = moment(this.cita.fecha).toISOString();
  if (!this.cita._id) {
  peticion = this.agendaService.altaCita(this.cita);
  } else {
    console.log('actualizar');
   peticion = this.agendaService.actualizaCita(this.cita);
  }
      // console.log(this.consultorio);
      peticion.subscribe( resp => {
        this.getCitas();
        console.log('respuesta del request ', resp);
        Swal.fire({
          title: 'Cita',
          text: 'Se guardo correctamente',
          type: 'success'
        });
      },
      (error) => {
      console.log(error.message);
      if (error.status === 403) { this.g.onLoggedout(); }
      });
}

  eliminarCita( form: NgForm ) {
    this.modal.dismissAll();
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro de que desea borrar esta cita`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
     }).then( resp => {
         if ( resp.value ) {
            this.agendaService.borrarCita(this.cita._id).subscribe( ( rsponse: any ) => {
            const eventIndex = this.calendarEvents.findIndex( event => event.id === this.args.id);
            this.calendarEvents.splice(eventIndex, 1);
            this.calEvents = [...this.calEvents];
           },
           (error) => {
           console.log(error.message);
           if (error.status === 403) { this.g.onLoggedout(); }
           });
         }
     });
  }
}
