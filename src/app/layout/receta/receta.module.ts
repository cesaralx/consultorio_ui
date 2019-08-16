import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';


import { RecetaRoutingModule } from './receta-routing.module';
import { RecetaComponent } from './receta.component';

import { PageHeaderModule } from '../../shared';
import { PdfViewerModule } from 'ng2-pdf-viewer';



@NgModule({
  declarations: [RecetaComponent],
  imports: [
    CommonModule,
    RecetaRoutingModule,
    PdfViewerModule,
    PageHeaderModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class RecetaModule { }
