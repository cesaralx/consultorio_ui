import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnexosComponent } from './anexos.component';
import { AnexosRoutingModule } from './anexos-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderModule, StatModule } from '../../shared';



@NgModule({
  declarations: [AnexosComponent],
  imports: [
    CommonModule,
    AnexosRoutingModule,
    TranslateModule,
    PageHeaderModule,
    StatModule
  ]
})
export class AnexosModule { }
