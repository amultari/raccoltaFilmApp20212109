import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./core/auth/login/login.module').then(m => m.LoginModule) },
  { path: 'dashboard', loadChildren: () => import('./features/dashboard.module').then(m => m.DashboardModule) },
  { path: '**', redirectTo: '/dashboard' },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
