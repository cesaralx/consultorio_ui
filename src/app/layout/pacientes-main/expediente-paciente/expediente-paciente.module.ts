import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpedientePacienteRoutingModule } from './expediente-paciente-routing.module';
import { ExpedientePacienteComponent } from './expediente-paciente.component';

import { PageHeaderModule } from '../../../shared';

import { TranslateModule } from '@ngx-translate/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

// import {TimelineComponent} from '../../../usr-view/historial/components';
import { StatModule } from '../../../shared';


@NgModule({
  declarations: [ExpedientePacienteComponent],
  imports: [
    CommonModule,
    ExpedientePacienteRoutingModule,
    FormsModule,
    NgbModalModule,
    TranslateModule,
    PageHeaderModule,
    StatModule
  ]
})
export class ExpedientePacienteModule { }
