import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacientesComponent } from './pacientes.component';
import { PacientesRouterModuling } from './pacientes-routing.module';

@NgModule({
    imports: [CommonModule, PacientesRouterModuling],
    declarations: [PacientesComponent]
})
export class PacientesModule {}
