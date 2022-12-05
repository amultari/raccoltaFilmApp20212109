import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {FormsModule} from "@angular/forms";
import {UiKitModule} from "../core/UI/ui-kit.module";
import {RouterModule, Routes} from "@angular/router";
import {WelcomeComponent} from "./welcome/welcome.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'welcome', loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule) },
      { path: 'regista', loadChildren: () => import('./regista/regista.module').then(m => m.RegistaModule) },
      { path: 'film', loadChildren: () => import('./film/film.module').then(m => m.FilmModule) },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    UiKitModule
  ]
})
export class DashboardModule { }
