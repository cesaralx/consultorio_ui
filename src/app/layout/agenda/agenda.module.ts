import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaComponent } from './agenda.component';


import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!




@NgModule({
  declarations: [AgendaComponent],
  exports: [AgendaComponent],
  imports: [
    TranslateModule,
    CommonModule,
    AgendaRoutingModule,
    NgbModalModule,
    FormsModule,
    FullCalendarModule
  ],
  bootstrap: [AgendaComponent]
})
export class AgendaModule { }
