import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitaMedicaPacienteComponent } from './visita-medica-paciente.component';
import { VisitaMedicaPacienteRoutingModule } from './visita-medica-paciente.routing.module';
import { PageHeaderModule } from '../../../shared';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [VisitaMedicaPacienteComponent],
  imports: [
    CommonModule,
    VisitaMedicaPacienteRoutingModule,
    PageHeaderModule,
    FormsModule,
    TranslateModule
  ]
})
export class VisitaMedicaPacienteModule { }
