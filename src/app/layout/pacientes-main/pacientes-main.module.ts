import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesMainRoutingModule } from './pacientes-main-routing.module';
import { PacientesMainComponent } from './pacientes-main.component';

import { PageHeaderModule } from '../../shared';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ConsultaComponent } from './consulta/consulta.component';

@NgModule({
  declarations: [PacientesMainComponent, ConsultaComponent],
  imports: [
    CommonModule,
    PacientesMainRoutingModule,
    PageHeaderModule,
    TranslateModule
  ]
})
export class PacientesMainModule { }
