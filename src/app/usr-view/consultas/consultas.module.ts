import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ConsultasComponent } from './consultas.component';
import { ConsultasRoutingModule } from './consultas-routing.module';
import { PageHeaderModule, StatModule } from '../../shared';



@NgModule({
  declarations: [ConsultasComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ConsultasRoutingModule,
    PageHeaderModule,
    StatModule
  ]
})
export class ConsultasModule { }
