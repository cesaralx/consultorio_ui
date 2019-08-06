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

import * as moment from 'moment';



@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
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
  locale = esLocale;
  estatus = [ {color: '#52FF33', status: 'confirmada'},
              {color: '#3346FF', status: 'nueva'},
              {color: '#B533FF', status: 'reagendada'},
              {color: '#FF5733', status: 'cancelada'},
            ];

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
    this.open(content);
    this.eliminar = true;
    this.title = 'Nueva';
    this.cita = new CitaModel();
    this.cita.fecha = moment(arg.date).format('YYYY-MM-DD[T]HH:mm');
    this.cita.hour_start = moment(arg.date).format('HH:mm');
    this.args = arg;
    console.log('args', arg.date.getHours());
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
    console.log('rango:', moment(arg.start).format('yyyy/MM/dd HH:mm') , arg.end); // date=date.format('MM/DD/YYYY');

   }

open(content) {
  this.modal.open(content).result.then((result) => {
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
            console.log('pacientes', this.pacientes);
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
  this.agendaService.getCitas()
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
  });
  resolve(true);
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
