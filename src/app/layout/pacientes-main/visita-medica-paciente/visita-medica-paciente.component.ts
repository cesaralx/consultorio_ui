import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

// Servicios
import {PacientesService} from '../pacientes/pacientes.service';
import { ExpedientesService } from '../../expedientes-main/expedientes/expedientes.service';
import {ConsultoriosService} from '../../consultorios/consultorios.service';
import {VisitaMedicaService} from '../../visita-medica/visita-medica.service';
import { LayoutService } from '../../layout.service';


// Modelos
import {PacienteModel} from '../pacientes/pacientes.model';
import {ExpedientesModel} from '../../expedientes-main/expedientes/expedientes.model';
import {VisitaModel} from '../../visita-medica/visita-medica.model';

@Component({
  selector: 'app-visita-medica-paciente',
  templateUrl: './visita-medica-paciente.component.html',
  styleUrls: ['./visita-medica-paciente.component.scss']
})
export class VisitaMedicaPacienteComponent implements OnInit {

  constructor(private pacienteService: PacientesService,
              private expedienteService: ExpedientesService,
              private consultoriosService: ConsultoriosService,
              private visitaService: VisitaMedicaService,
              private router:Router,
              private activatedRoute: ActivatedRoute) { }

   cargando: boolean = true;
   private g = new LayoutService();
   visitas: VisitaModel[] = [];
   private paciente_id: any;
   id: string;

  ngOnInit() {
    this.paciente_id = this.activatedRoute.params.subscribe(async params => {
      this.id = params.id;
      this.getVisitas();
      console.log('visitas medicas', this.visitas);
   });
  }
   // funciones de visitas nod devuelve nada T_T 
   getVisitasByIdPAciente = () => new Promise((resolve , reject) => {
    this.visitaService.getVisitaByPaciente(this.id) .subscribe( async  (resp: any) => {
      this.cargando = false;
      resolve(this.visitas = resp);
    }, (error) => {
    console.log(error.message);
    if (error.status === 403) { reject(this.g.onLoggedout()); }
    });
 })

    // funciones de visitas
    getVisitas = () => new Promise((resolve , reject) => {
      this.visitaService.getVisitasMedicas() .subscribe( async  (resp: any) => {
        resp.forEach(element => {
          if (element.id_paciente === this.id){
              this.visitas.push(element);
          }
        });
        this.cargando = false;
        resolve(this.visitas);
      }, (error) => {
      console.log(error.message);
      if (error.status === 403) { reject(this.g.onLoggedout()); }
      });
   })
   gotoConsulta (item: VisitaModel) {
    this.router.navigate(['pacientes/consultas-medicas/consulta/' + item._id]);
  }




}
