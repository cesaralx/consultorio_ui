import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


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
    FormsModule
  ]
})
export class VisitaMedicaModule { }