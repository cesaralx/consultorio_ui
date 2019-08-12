import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaComponent } from './consulta.component';
import { ConsultaRoutingModule } from './consulta.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderModule } from '../../../shared';



@NgModule({
  declarations: [ConsultaComponent],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    TranslateModule,
    PageHeaderModule
  ]
})
export class ConsultaModule { }
