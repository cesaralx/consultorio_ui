import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { TranslateModule } from '@ngx-translate/core';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { PageHeaderModule } from '../../shared';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent,
    NotificationMissingComponent
} from './components';
import { StatModule } from '../../shared';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        DashboardRoutingModule,
        StatModule,
        Ng2Charts,
        PageHeaderModule,
        TranslateModule
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent,
        NotificationMissingComponent
    ]
})
export class DashboardModule {}
