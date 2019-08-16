import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaComponent } from './consulta.component';
import { ConsultaRoutingModule } from './consulta.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderModule } from '../../../shared';
import { FormsModule } from '@angular/forms';





@NgModule({
  declarations: [ConsultaComponent],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    TranslateModule,
    PageHeaderModule,
    FormsModule
  ]
})
export class ConsultaModule { }
