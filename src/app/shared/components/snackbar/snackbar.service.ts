import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErroreResponse } from '../../services/error.interceptor';
import { SnackbarComponent } from './snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openErrorSnackBar(errore: ErroreResponse) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      data: errore.message,
      panelClass: ['error-snackbar']
    });
  }

  openSuccessSnackBar(testo: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      data: testo,
      panelClass: ['success-snackbar']
    });
  }
}
