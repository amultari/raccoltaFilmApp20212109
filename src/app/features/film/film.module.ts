import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilmCreateComponent} from "./film-create/film-create.component";
import {FilmListComponent} from "./film-list/film-list.component";
import {FilmDetailComponent} from "./film-detail/film-detail.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {RegistaListComponent} from "../regista/regista-list/regista-list.component";
import {RegistaCreateComponent} from "../regista/regista-create/regista-create.component";
import {FilmService} from "./film.service";

const routes: Routes = [
  {
    path: 'list',
    component: FilmListComponent
  },
  {
    path: 'create',
    component: FilmCreateComponent
  },
  {
    path: ':id',
    component: FilmDetailComponent
  },
  {
    path: '',
    redirectTo: 'list'
  }
];

@NgModule({
  declarations: [
    FilmCreateComponent,
    FilmListComponent,
    FilmDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  providers: [
    FilmService
  ]
})
export class FilmModule { }
