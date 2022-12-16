import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IsUserLoggedInDirective } from './directives/is-user-logged-in.directive';
import { DecodificaSessoPipe } from './pipes/decodifica-sesso.pipe';



@NgModule({
  declarations: [IsUserLoggedInDirective, DecodificaSessoPipe],
  imports: [
    CommonModule
  ],
  exports: [IsUserLoggedInDirective,DecodificaSessoPipe]
})
export class SharedModule { }
