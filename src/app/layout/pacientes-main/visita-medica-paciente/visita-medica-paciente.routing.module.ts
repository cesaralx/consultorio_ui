import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitaMedicaPacienteComponent } from './visita-medica-paciente.component';


const routes: Routes = [
  {
    path: '',
    component: VisitaMedicaPacienteComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitaMedicaPacienteRoutingModule { }