import { Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Full calendar
import { EventInput, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import listPlugin from '@fullcalendar/list';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { FullCalendarComponent } from '@fullcalendar/angular';
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
import { getLocaleTimeFormat } from '@angular/common';




@Component({
  selector: 'app-agenda',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  // Variables utilizadas
  eliminar: boolean = false;
  pacientes: PacientModel [] = [];
  cita = new CitaModel();
  citas: CitaModel[] = [];
  consultorios: ConsultorioModel [] = [];
  args: any ;
  // Variable para el uso del modal
  closeResult: string;
  // Carga de datos del plugin fullcalendar
  calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, bootstrapPlugin]; // important!
  calendarEvents: EventInput[] = [];

  constructor(private translate: TranslateService,
              private modal: NgbModal,
              private agendaService: AgendaService,
              private consultoriosService: ConsultoriosService) { }

  ngOnInit() {
    this.getPacientes();
    this.getConsultorios();
    this.getCitas();
    // console.log(this.calendarEvents);
  }
  modifyTitle(eventIndex, newTitle) {
    const calendarEvents = this.calendarEvents.slice(); // a clone
    const singleEvent = Object.assign({}, calendarEvents[eventIndex]); // a clone
    singleEvent.title = newTitle;
    calendarEvents[eventIndex] = singleEvent;
    this.calendarEvents = calendarEvents; // reassign the array
  }

  handleDateClick(arg, content) {
    this.open(content);
    this.eliminar = true;
    this.cita = new CitaModel();
    this.cita.fecha = arg.dateStr;
    console.log(arg);
    //if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
    //  this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
    //    title: 'New Event',
    //    start: arg.date,
    //    allDay: arg.allDay
    //  });
    //}
   }

open(content) {
  this.modal.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {

  });
}
eventClick(arg, content) {
  this.args = arg;
   console.log('argumentitos',this.args);

   this.eliminar = false;
   //console.log(arg.event);
   this.agendaService.getCita(arg.event.id).subscribe( (resp: any) => {
   // console.log('Respuesta de agenda', resp);
    this.cita = resp; 
  });
  this.open(content);

 }

 getPacientes() {
  this.agendaService.getPacientes()
        .subscribe( (resp: any) => {
            this.pacientes = resp;
            console.log('pacientes: ', this.pacientes);
        });
}

getConsultorios() {
  this.consultoriosService.getConsultorios()
            .subscribe( (resp: any) => {
                this.consultorios = resp;
            });
 }

 getCitas() {
  this.agendaService.getCitas()
      .subscribe( (resp: any) => {
       this.citas = resp;
       this.llenarArreglo();
  });
 }

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
  // this.consultorios.push(this.consultorio);
  } else {
    console.log('actualizar');
   peticion = this.agendaService.actualizaCita(this.cita);
  }
      // console.log(this.consultorio);
      peticion.subscribe( resp => {
        
        Swal.fire({
          title: 'Actualizo',
          text: 'Se actualizo correctamente',
          type: 'success'
        });
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
           this.agendaService.borrarCita(this.cita._id).subscribe( (resp: any) => {
            console.log(resp);
           });
         }
     });
  }

  llenarArreglo() {
    if (this.citas === null){return []}
    this.citas.forEach( cita => {
      this.calendarEvents.push({
        id: cita._id,
        start: cita.fecha,
        title: cita.extra
      });
    });
  }
}
