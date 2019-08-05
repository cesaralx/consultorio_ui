import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { RecoveryRoutingModule } from './recovery-routing.module';
import { RecoveryComponent } from './recovery.component';

@NgModule({
  declarations: [RecoveryComponent],
  exports: [RecoveryComponent],
  imports: [
    CommonModule,
    RecoveryRoutingModule,
    TranslateModule
  ]
})
export class RecoveryModule { }
