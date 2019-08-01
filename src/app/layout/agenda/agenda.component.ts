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
import { getLocaleTimeFormat } from '@angular/common';





@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  // Variables utilizadas
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

  constructor(private translate: TranslateService,
              private modal: NgbModal,
              private agendaService: AgendaService,
              private consultoriosService: ConsultoriosService) { }

  ngOnInit() {
    this.getPacientes();
    this.getConsultorios();
    this.getCitas();
   // this.calendarEvents = this.calEvents;
  }

  handleDateClick(arg, content) {
    this.open(content);
    this.eliminar = true;
    this.title = 'Nueva';
    this.cita = new CitaModel();
    this.cita.fecha = arg;
    this.args = arg;
    // console.log('cita:', this.cita);
    // console.log('args', arg);
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
  });
  this.open(content);

 }
 getPacientes() {
  this.agendaService.getPacientes()
        .subscribe( (resp: any) => {
            this.pacientes = resp;
            console.log('pacientes', this.pacientes);
        });
}
getConsultorios() {
  this.consultoriosService.getConsultorios()
            .subscribe( (resp: any) => {
                this.consultorios = resp;
            });
 }

 getCitas() {
  this.calendarEvents = [];
  this.calEvents = [];
  this.agendaService.getCitas()
      .subscribe( (resp: any) => {
       this.citas = resp;
      if (this.citas === null) { return [] }
      this.citas.forEach( cita => {
        const resultado = this.estatus.find(busca => busca.status === cita.status);
        const obj = this.pacientes.find(res => res._id === cita.id_paciente);
          this.calEvents.push({
          id: cita._id,
          start: cita.fecha,
          title: obj.nombre,
          backgroundColor: resultado.color,
          slotDuration: '00:30:00',
          defaultTimedEventDuration: '00:30:00'
        });
      });
      this.calendarEvents = this.calEvents;
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
  } else {
    console.log('actualizar');
   peticion = this.agendaService.actualizaCita(this.cita);
  }
      // console.log(this.consultorio);
      peticion.subscribe( resp => {
        this.getCitas();
        console.log('respuesta del request ', resp);
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
            this.agendaService.borrarCita(this.cita._id).subscribe( ( resp: any ) => {
            const eventIndex = this.calendarEvents.findIndex( event => event.id === this.args.id);
            this.calendarEvents.splice(eventIndex, 1);
            this.calEvents = [...this.calEvents];
           });
         }
     });
  }
}
