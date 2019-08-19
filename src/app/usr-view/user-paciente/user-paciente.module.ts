import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPacienteComponent } from './user-paciente.component';
import { UserPacienteRoutingModule } from './user-paciente-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { PageHeaderModule, StatModule } from '../../shared';

@NgModule({
  declarations: [UserPacienteComponent],
  imports: [
    CommonModule,
    PageHeaderModule,
    UserPacienteRoutingModule,
    TranslateModule,
    StatModule
  ]
})
export class UserPacienteModule { }
