import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

// Componentes

import { ConsultoriosComponent } from './consultorios.component';
import { ConsultoriosRoutingModule } from './consultorios-routing.module';





@NgModule({
  declarations: [ConsultoriosComponent],
  exports: [ConsultoriosComponent],
  imports: [
    CommonModule,
    NgbModalModule,
    TranslateModule,
    ConsultoriosRoutingModule
  ]
})
export class ConsultoriosModule { }
