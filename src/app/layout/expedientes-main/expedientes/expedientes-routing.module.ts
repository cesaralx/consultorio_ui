import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpedientesComponent } from './expedientes.component';

const routes: Routes = [
    {
        path: '',
        component: ExpedientesComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpedientesRouterModuling { }
