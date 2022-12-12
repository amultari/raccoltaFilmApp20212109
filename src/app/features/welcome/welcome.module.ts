import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WelcomeComponent} from "./welcome.component";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../../core/auth/login/login.component";
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../shared/material.module";

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  }
];

@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MaterialModule
  ]
})
export class WelcomeModule { }
