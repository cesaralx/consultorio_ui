import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsrViewComponent } from './usr-view.component';

const routes: Routes = [
    {
        path: '',
        component: UsrViewComponent,
        children: [
            { path: '', redirectTo: 'inicio', pathMatch: 'prefix' },
            { path: 'inicio', loadChildren: () => import('./historial/historial.module').then(m => m.HistorialModule) },
            { path: 'historial', loadChildren: () => import('./user-paciente/user-paciente.module').then(m => m.UserPacienteModule) },
            { path: 'consultas', loadChildren: () => import('./consultas/consultas.module').then(m => m.ConsultasModule) },
            { path: 'consultas/:id', loadChildren: () => import('./anexos/anexos.module').then(m => m.AnexosModule) },
            // { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule) },
            // { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
            // { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
            // { path: 'bs-element', loadChildren: () => import('./bs-element/bs-element.module').then(m => m.BsElementModule) },
            // { path: 'grid', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule) },
            // { path: 'components', loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule) },
            // { path: 'blank-page', loadChildren: () => import('./blank-page/blank-page.module').then(m => m.BlankPageModule) },
            // { path: 'pacientes', loadChildren: () => import('./pacientes/pacientes.module').then(m => m.PacientesModule) },
            // { path: 'agenda', loadChildren: () => import('./agenda/agenda.module').then(m => m.AgendaModule) },
            // { path: 'consultorio', loadChildren: () => import('./consultorios/consultorios.module').then(m => m.ConsultoriosModule) }

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsrViewRoutingModule {}
