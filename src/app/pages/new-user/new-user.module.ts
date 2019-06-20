
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './new-user.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';

/* components */
import { TableComponent } from './new-user.component';
import { DataTableComponent } from './components/data-table/data-table.component';

@NgModule({
    imports: [
        NgxPaginationModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing
    ],
    declarations: [
        TableComponent,
        DataTableComponent
    ]
})
export class NewUserModule { }
