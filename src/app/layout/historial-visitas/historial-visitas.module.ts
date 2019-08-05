import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { HistorialVisitasRoutingModule } from './historial-visitas-routing.module';
import { HistorialVisitasComponent } from './historial-visitas.component';



@NgModule({
  declarations: [HistorialVisitasComponent],
  imports: [
    CommonModule,
    HistorialVisitasRoutingModule,
    NgbModalModule,
    FormsModule,
    DataTablesModule
  ]
})
export class HistorialVisitasModule { }
