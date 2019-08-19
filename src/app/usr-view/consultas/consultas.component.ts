import { Component, OnInit } from '@angular/core';
import { VisitaMedicaService } from '../../layout/visita-medica/visita-medica.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import { LayoutService } from '../../layout/layout.service';
import { VisitaModel } from '../../layout/visita-medica/visita-medica.model';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.scss']
})
export class ConsultasComponent implements OnInit {
  cargando: boolean = true;
  private g = new LayoutService();
  visitas: VisitaModel[] = [];
  private paciente_id: any;
  id: string;
  constructor( private visitaService: VisitaMedicaService,
               private router: Router,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = localStorage.getItem('id');
    this.getVisitas();
  }
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

 gotoConsulta (item: any) {
  this.router.navigate(['/usuario-view/consultas/:id' + item._id]);
}

}
