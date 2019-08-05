import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// Model
import { VisitaModel } from '../visita-medica/visita-medica.model';
import { CitaModel, PacientModel } from '../agenda/cita.model';
import { ConsultorioModel } from '../consultorios/consultorio.model';

// servicios
import { LayoutService, lenguaje } from '../layout.service';
import { AgendaService } from '../agenda/agenda.service';
import { ConsultoriosService } from '../consultorios/consultorios.service';
import { VisitaMedicaService } from '../visita-medica/visita-medica.service';

// sweetalert2
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-historial-visitas',
  templateUrl: './historial-visitas.component.html',
  styleUrls: ['./historial-visitas.component.scss']
})
export class HistorialVisitasComponent implements OnInit {
  private g = new LayoutService();
  closeResult: string;
  visita = new VisitaModel();
  visitas: VisitaModel[] = [];
  citas: CitaModel[] = [];
  cita: CitaModel = new CitaModel();
  consultorios: ConsultorioModel [] = [];
  pacientes: PacientModel [] = [];

  constructor( private visitaService: VisitaMedicaService,
               private agendaService: AgendaService,
               private consultoriosService: ConsultoriosService,
               private modal: NgbModal,
               public httpClient: HttpClient) { }

  ngOnInit() {
    this.getPacientes();
  }

  // Funciones del modal
  open(content) {
    this.modal.open(content, { size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
}

  alta( content) {
    this.visita = new VisitaModel();
    this.open(content);
  }

  getPacientes() {
    this.agendaService.getPacientes()
          .subscribe( (resp: any) => {
              this.pacientes = resp;
              console.log('pacientes', this.pacientes);
          },
          (error) => {
          console.log(error.message);
          if (error.status === 403) { this.g.onLoggedout(); }
          });
  }

  getConsultorios() {
    this.consultoriosService.getConsultorios()
          .subscribe( (resp: any) => {
          this.consultorios = resp;
          },
          (error) => {
          console.log(error.message);
          if (error.status === 403) { this.g.onLoggedout(); }
          });
   }

   getCitas() {
    this.agendaService.getCitas()
        .subscribe( (resp: any) => {
        this.citas = resp;
        if (this.citas === null) { return [] }
        console.log('Citas medicas:', this.citas);
         this.citas.forEach( cita => {
           const obj = this.pacientes.find(res => res._id === cita.id_paciente);
           if (obj != null) {
            cita.nombrePaciente = obj.nombre;
           } else {
             cita.nombrePaciente = 'Nombre no valido';
           }
           const resultado = this.consultorios.find(busca => busca._id === cita.id_consultorio);
           if (resultado != null) {
            cita.nombreConsultorio = resultado.nombre;
           } else {
             cita.nombreConsultorio = 'Consulta no valido';
           }

         });
    },
    (error) => {
    console.log(error.message);
    if (error.status === 403) { this.g.onLoggedout(); }
    });
   }

}
