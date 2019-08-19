import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnexosComponent } from './anexos.component';


const routes: Routes = [
  {
    path: '',
    component: AnexosComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule { }