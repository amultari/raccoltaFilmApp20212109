import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IsAdminDirective} from "./directives/is-admin.directive";
import { SessoPipe } from './pipes/sesso.pipe';



@NgModule({
  declarations: [
    IsAdminDirective,
    SessoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IsAdminDirective,
    SessoPipe
  ]
})
export class SharedModule { }
