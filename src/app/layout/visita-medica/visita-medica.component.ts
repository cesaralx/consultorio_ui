import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

// Model
import { VisitaModel } from './visita-medica.model';
import { ConsultorioModel, UsModel } from '../consultorios/consultorio.model';

// Servicios
import { VisitaMedicaService } from './visita-medica.service';
import { LayoutService, lenguaje } from '../layout.service';

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
  consultorio = new ConsultorioModel();
  consultorios: ConsultorioModel[] = [];
  users: UsModel[] = [];

  private g = new LayoutService();

  constructor( private visitaService: VisitaMedicaService,
               private modal: NgbModal) { }

  ngOnInit() {
    this.cargando = true;
  }

  open(content) {
    this.modal.open(content).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {

    });
}

  alta( content) {
    this.visita = new VisitaModel();
    this.open(content);
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
