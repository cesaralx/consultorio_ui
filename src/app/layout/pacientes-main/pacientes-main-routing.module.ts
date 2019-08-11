import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacientesMainComponent } from './pacientes-main.component';


const routes: Routes = [
  {
      path: '',
      component: PacientesMainComponent,
    children: [
    // { path: '', redirectTo: 'pacientes', pathMatch: 'prefix' },
    { path: '', loadChildren: () => import('./pacientes/pacientes.module')
    .then(m => m.PacientesModule)},
    { path: 'consultas-medicas/:id', loadChildren: () => import('./visita-medica-paciente/visita-medica-paciente.module')
    .then(m => m.VisitaMedicaPacienteModule)},
    { path: 'expediente-paciente/:id', loadChildren: () => import('./expediente-paciente/expediente-paciente.module')
    .then(m => m.ExpedientePacienteModule)},
    // { path: 'pacientes', loadChildren: () => import('./pacientes/pacientes.module').then(m => m.PacientesModule )}
    ]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],

})
export class PacientesMainRoutingModule { }
