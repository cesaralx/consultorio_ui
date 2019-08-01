import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitaMedicaComponent } from './visita-medica.component';


const routes: Routes = [
  {
    path: '',
    component: VisitaMedicaComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitaMedicaRoutingModule { }