import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesComponent } from './pacientes.component';
import { PacientesRouterModuling } from './pacientes-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, PacientesRouterModuling, PageHeaderModule],
    declarations: [PacientesComponent]
})
export class PacientesModule {}
