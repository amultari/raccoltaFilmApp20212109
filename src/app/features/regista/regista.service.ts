import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Regista } from '../../model/regista';

@Injectable()
export class RegistaService {

  private apiServer = 'http://localhost:8080/api/regista';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  /** GET registi from the server */
  getRegisti(): Observable<Regista[]> {
    return this.http.get<Regista[]>(this.apiServer)
  }

  getRegista(id: string): Observable<Regista> {
    return this.http.get<Regista>(this.apiServer+"/"+id)
  }

  updateRegista(registaUpdate: Regista): Observable<Regista> {
    return this.http.put<Regista>(this.apiServer+"/"+registaUpdate.id, registaUpdate, this.httpOptions);
  }

  /** POST: add a new regista to the server */
  addRegista(registaInput: Regista): Observable<Regista> {
    return this.http.post<Regista>(this.apiServer, registaInput, this.httpOptions);
  }

}
