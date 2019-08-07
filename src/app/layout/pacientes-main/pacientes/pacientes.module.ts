import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesComponent } from './pacientes.component';
import { PacientesRouterModuling } from './pacientes-routing.module';
import { PageHeaderModule } from '../../../shared';


import { TranslateModule } from '@ngx-translate/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';



@NgModule({
    imports: [CommonModule,
        PacientesRouterModuling,
        PageHeaderModule,
        TranslateModule,
        NgbModalModule,
        FormsModule,
        DataTablesModule
    ],
    declarations: [PacientesComponent],
    exports: [PacientesComponent],
})
export class PacientesModule {}
