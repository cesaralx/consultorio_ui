import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpedientesSearchComponent } from './expedientes-search.component';

const routes: Routes = [
  {
      path: '',
      component: ExpedientesSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpedientesSearchRoutingModule { }
