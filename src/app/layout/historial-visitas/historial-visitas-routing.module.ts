import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistorialVisitasComponent } from './historial-visitas.component';

const routes: Routes = [
  {
    path: '',
    component: HistorialVisitasComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialVisitasRoutingModule { }