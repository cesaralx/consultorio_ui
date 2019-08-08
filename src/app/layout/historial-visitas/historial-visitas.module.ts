import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ngfModule} from 'angular-file';

import { ArchwizardModule } from 'angular-archwizard';

import { HistorialVisitasRoutingModule } from './historial-visitas-routing.module';
import { HistorialVisitasComponent } from './historial-visitas.component';



@NgModule({
  declarations: [HistorialVisitasComponent],
  imports: [
    CommonModule,
    HistorialVisitasRoutingModule,
    NgbModalModule,
    FormsModule,
    NgbModule,
    DataTablesModule,
    ArchwizardModule,
    ngfModule
  ]
})
export class HistorialVisitasModule { }
