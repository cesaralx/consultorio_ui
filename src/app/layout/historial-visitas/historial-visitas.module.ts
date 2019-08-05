import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialVisitasRoutingModule } from './historial-visitas-routing.module';
import { HistorialVisitasComponent } from './historial-visitas.component';



@NgModule({
  declarations: [HistorialVisitasComponent],
  imports: [
    CommonModule,
    HistorialVisitasRoutingModule
  ]
})
export class HistorialVisitasModule { }
