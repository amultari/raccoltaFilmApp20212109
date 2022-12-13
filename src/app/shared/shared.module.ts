import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IsAdminDirective} from "./directives/is-admin.directive";
import { SessoPipe } from './pipes/sesso.pipe';
import { MaterialModule } from './material.module';
import { IsLoggedDirective } from './directives/is-logged.directive';



@NgModule({
  declarations: [
    IsAdminDirective,
    SessoPipe,
    IsLoggedDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    IsAdminDirective,
    SessoPipe,
    IsLoggedDirective
  ]
})
export class SharedModule { }
