import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PageHeaderModule } from './../../../shared';

import { ExpedientesSearchComponent } from './expedientes-search.component';
import { ExpedientesSearchRoutingModule } from './expedientes-search-routing.module';

@NgModule({
  declarations: [ExpedientesSearchComponent],
  exports: [ExpedientesSearchComponent],
  imports: [
    CommonModule,
    ExpedientesSearchRoutingModule,
    PageHeaderModule,
    FormsModule,
    NgbModalModule,
    TranslateModule
  ]
})
export class ExpedientesSearchModule { }
