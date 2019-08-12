import { NgModule } from '@angular/core';
import { ngfModule} from 'angular-file';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ArchwizardModule } from 'angular-archwizard';
import { PageHeaderModule } from '../../shared';

// Componentes
import { VisitaMedicaComponent } from './visita-medica.component';
import { VisitaMedicaRoutingModule } from './visita-medica-routing.module';



@NgModule({
  declarations: [VisitaMedicaComponent],
  exports: [VisitaMedicaComponent],
  imports: [
    CommonModule,
    NgbModalModule,
    TranslateModule,
    VisitaMedicaRoutingModule,
    FormsModule,
    DataTablesModule,
    ArchwizardModule,
    ngfModule,
    NgbModule,
    PageHeaderModule
  ]
})
export class VisitaMedicaModule { }