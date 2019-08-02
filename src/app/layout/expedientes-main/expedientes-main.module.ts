import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { ExpedientesMainRoutingModule } from './expedientes-main-routing.module';
import { ExpedientesMainComponent } from './expedientes-main.component';

import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [ExpedientesMainComponent],
  exports: [ExpedientesMainComponent],
  imports: [
    CommonModule,
    ExpedientesMainRoutingModule,
    TranslateModule,
    NgbModalModule,
    FormsModule,
    DataTablesModule
  ]
})
export class ExpedientesMainModule { }
