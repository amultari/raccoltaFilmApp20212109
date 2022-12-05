import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmCreateComponent } from './features/film/film-create/film-create.component';
import { FilmDetailComponent } from './features/film/film-detail/film-detail.component';
import { FilmListComponent } from './features/film/film-list/film-list.component';
import { RegistaCreateComponent } from './features/regista/regista-create/regista-create.component';
import { RegistaListComponent } from './features/regista/regista-list/regista-list.component';
import { WelcomeComponent } from './features/welcome/welcome.component';
import { LoginComponent } from "./core/auth/login/login.component";

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./core/auth/login/login.module').then(m => m.LoginModule) },
  { path: 'welcome', loadChildren: () => import('./features/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'regista', loadChildren: () => import('./features/regista/regista.module').then(m => m.RegistaModule) },
  { path: 'film', loadChildren: () => import('./features/film/film.module').then(m => m.FilmModule) },
  { path: '**', redirectTo: '/login' },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
