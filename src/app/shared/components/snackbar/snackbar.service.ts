import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErroreResponse } from '../../services/error.interceptor';
import { SnackbarComponent } from './snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(errore: ErroreResponse) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      data: errore
    });
  }
}
