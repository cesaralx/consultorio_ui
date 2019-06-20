import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './new-user.component';
import { DataTableComponent } from './components/data-table/data-table.component';

const childRoutes: Routes = [
    {
        path: '',
        component: TableComponent,
        children: [
            // { path: '', redirectTo: 'default-tables', pathMatch: 'full' },
            { path: '', component: DataTableComponent },
        ]
    }
];

export const routing = RouterModule.forChild(childRoutes);
