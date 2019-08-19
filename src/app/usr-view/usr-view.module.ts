import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { UsrViewRoutingModule } from './usr-view-routing.module';
import { UsrViewComponent } from './usr-view.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbDropdownModule,
    UsrViewRoutingModule
  ],
  declarations: [UsrViewComponent, SidebarComponent, HeaderComponent]
})
export class UsrViewModule { }
