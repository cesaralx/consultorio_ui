import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPacienteComponent } from './user-paciente.component';
import { UserPacienteRoutingModule } from './user-paciente-routing.module';

import { PageHeaderModule } from '../../shared';

@NgModule({
  declarations: [UserPacienteComponent],
  imports: [
    CommonModule,
    PageHeaderModule,
    UserPacienteRoutingModule
  ]
})
export class UserPacienteModule { }
