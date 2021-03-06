import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

import { AuthGuard } from '../shared';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
                canActivate: [AuthGuard] },
            { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule),
                canActivate: [AuthGuard] },
            { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule),
                canActivate: [AuthGuard] },
            { path: 'expedientes', loadChildren: () => import('./expedientes-main/expedientes-main.module').then(m =>
                m.ExpedientesMainModule), canActivate: [AuthGuard] },
            { path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule),
                canActivate: [AuthGuard] },
            { path: 'bs-element', loadChildren: () => import('./bs-element/bs-element.module').then(m => m.BsElementModule),
                canActivate: [AuthGuard] },
            { path: 'grid', loadChildren: () => import('./grid/grid.module').then(m => m.GridModule),
                canActivate: [AuthGuard] },
            { path: 'components', loadChildren: () => import('./bs-component/bs-component.module').then(m => m.BsComponentModule),
                canActivate: [AuthGuard] },
            { path: 'blank-page', loadChildren: () => import('./blank-page/blank-page.module').then(m => m.BlankPageModule),
                canActivate: [AuthGuard] },
            { path: 'pacientes', loadChildren: () => import('./pacientes-main/pacientes-main.module').then(m => m.PacientesMainModule),
                canActivate: [AuthGuard] },
            { path: 'agenda', loadChildren: () => import('./agenda/agenda.module').then(m => m.AgendaModule),
                canActivate: [AuthGuard] },
            { path: 'consultorio', loadChildren: () => import('./consultorios/consultorios.module').then(m => m.ConsultoriosModule),
                canActivate: [AuthGuard] },
            { path: 'visita-medica', loadChildren: () => import('./visita-medica/visita-medica.module').then(m => m.VisitaMedicaModule),
                canActivate: [AuthGuard] },
            { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule),
                canActivate: [AuthGuard] },
                { path: 'historial-visitas', loadChildren: () => import('./historial-visitas/historial-visitas.module').then(m =>
                m.HistorialVisitasModule), canActivate: [AuthGuard] },
            { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule),
            canActivate: [AuthGuard] },
            { path: 'receta', loadChildren: () => import('./receta/receta.module').then(m => m.RecetaModule),
                canActivate: [AuthGuard] },


        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
