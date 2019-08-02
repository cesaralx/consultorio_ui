import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// Model
import { VisitaModel } from './visita-medica.model';
import { CitaModel, PacientModel } from '../agenda/cita.model';
import { ConsultorioModel } from '../consultorios/consultorio.model';

// Servicios
import { VisitaMedicaService } from './visita-medica.service';
import { LayoutService, lenguaje } from '../layout.service';
import { AgendaService } from '../agenda/agenda.service';
import { ConsultoriosService } from '../consultorios/consultorios.service';

// sweetalert2
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-visita-medica',
  templateUrl: './visita-medica.component.html',
  styleUrls: ['./visita-medica.component.scss']
})
export class VisitaMedicaComponent implements OnInit {
  closeResult: string;
  cargando = false;
  visita = new VisitaModel();
  visitas: VisitaModel[] = [];
  citas: CitaModel[] = [];
  consultorios: ConsultorioModel [] = [];
  pacientes: PacientModel [] = [];


  private g = new LayoutService();

  constructor( private visitaService: VisitaMedicaService,
              private agendaService: AgendaService,
              private consultoriosService: ConsultoriosService,
              private modal: NgbModal) { }

  ngOnInit() {
    this.cargando = true;
    this.getConsultorios();
    this.getPacientes();
    this.getCitas();

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
        this.cargando = true;
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

  consultarVisitas() {
    this.visitaService.getVisitasMedicas()
    .subscribe( (resp: any) => {
      this.visitas = resp;
      // console.log('consultorios: ', resp);
      this.cargando = false;
    },
    (error) => {
    console.log(error.message);
    if (error.status === 403) { this.g.onLoggedout(); }
    });
 }




}
