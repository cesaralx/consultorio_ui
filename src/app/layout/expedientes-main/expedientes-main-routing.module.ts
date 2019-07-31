import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpedientesMainComponent } from './expedientes-main.component';

const routes: Routes = [
  {
    path: '',
    component: ExpedientesMainComponent,
    children: [
      { path: '', redirectTo: 'expedientes', pathMatch: 'prefix' },
      { path: 'nuevo', loadChildren: () => import('./expedientes/expedientes.module').then(m => m.ExpedientesModule)},
      { path: 'buscar', loadChildren: () => import('./expedientes-search/expedientes-search.module').then(m => m.ExpedientesSearchModule )}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpedientesMainRoutingModule { }
