import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';

import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [UsuariosComponent],
  exports: [UsuariosComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    TranslateModule,
    NgbModalModule,
    FormsModule,
    DataTablesModule,
  ]
})
export class UsuariosModule { }
