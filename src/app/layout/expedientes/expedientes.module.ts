import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { PageHeaderModule } from './../../shared';

import { ExpedientesComponent } from './expedientes.component';
import { ExpedientesRouterModuling } from './expedientes-routing.module';

import { ArchwizardModule } from 'angular-archwizard';



@NgModule({
  declarations: [ExpedientesComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgbModalModule,
    FormsModule,
    ExpedientesRouterModuling,
    ArchwizardModule,
    PageHeaderModule
  ],
  bootstrap: [ExpedientesComponent]
})
export class ExpedientesModule { }
