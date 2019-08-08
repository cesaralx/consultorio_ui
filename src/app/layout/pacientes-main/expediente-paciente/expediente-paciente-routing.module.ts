import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpedientePacienteComponent } from './expediente-paciente.component';


const routes: Routes = [
  {
    path: '',
    component: ExpedientePacienteComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpedientePacienteRoutingModule { }
