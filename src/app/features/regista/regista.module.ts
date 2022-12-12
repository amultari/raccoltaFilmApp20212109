import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistaCreateComponent} from "./regista-create/regista-create.component";
import {RegistaListComponent} from "./regista-list/regista-list.component";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {RegistaService} from "./regista.service";
import { MaterialModule } from 'src/app/shared/material.module';

const routes: Routes = [
  {
    path: 'list',
    component: RegistaListComponent
  },
  {
    path: 'create',
    component: RegistaCreateComponent
  },
  {
    path: 'edit/:id',
    component: RegistaCreateComponent
  },
  {
    path: '',
    redirectTo: 'list'
  }
];

@NgModule({
  declarations: [
    RegistaCreateComponent,
    RegistaListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MaterialModule
  ],
  providers: [
    RegistaService,
  ]
})
export class RegistaModule { }
