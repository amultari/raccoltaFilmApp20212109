import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({ headers: new HttpHeaders({ Authorization: `Bearer ${this.authService.getUserToken()}` }) });
    return next.handle(request).pipe(
      catchError(err => this.checkError(err, request))
    );
  }

  checkError(err: any, request: any) {
    let error = { message: err.error.message, status: err.status, url: '/', error: err };

    if (err) {
      switch (err.status) {
        case 401: {
          this.authService.logout();
          error = { message: 'Sessione scaduta', status: err.status, url: request.url, error: err };
          break;
        }
        case 403: {
          error = { message: 'Utente non autorizzato ad utilizzare la funzione', status: err.status, url: request.url, error: err };
          break;
        }
        case 404: {
          error = { message: err.error.message, status: err.status, url: request.url, error: err };
          break;
        }
        case 422: {
          error = { message: err.error.message, status: err.status, url: request.url, error: err };
          break;
        }
        case 500: {
          error = { message: err.error.message, status: err.status, url: request.url, error: err };
          break;
        }
        case 0: {
          if (err.message && err.message.indexOf('unknown url') !== -1) {
            error = { message: 'Servizio non disponibile', status: err.status, url: request.url, error: err };
            break;
          }
          error = { message: 'Errore interno generico', status: err.status, url: '/', error: err };
          break;
        }
        default: {
          error = { message: 'Errore interno generico', status: err.status, url: '/', error: err };
          break;
        }
      }
    }
    return throwError(() => new Error(error.message));
}


}
