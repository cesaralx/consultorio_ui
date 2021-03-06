import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialRoutingModule } from './historial-routing.module';
import { HistorialComponent } from './historial.component';
import { TranslateModule } from '@ngx-translate/core';

import { PageHeaderModule } from '../../shared';
import {
    TimelineComponent
} from './components';
import { StatModule } from '../../shared';


@NgModule({
  declarations: [HistorialComponent, TimelineComponent],
  imports: [
    CommonModule,
    HistorialRoutingModule,
    PageHeaderModule,
    StatModule,
    TranslateModule
  ]
})
export class HistorialModule { }
