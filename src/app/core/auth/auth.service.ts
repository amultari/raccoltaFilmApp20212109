import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { User } from 'src/app/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_URL:string = environment.base_url+ '/auth'; 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private userLoggedSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(private http:HttpClient) { }

  login(loginForm: User): Observable<User> {
    //return of({ username: loginForm.username, token: "123456" });
    //return this.http.post<{"jwt-token":string}>(this.AUTH_URL+"/login", JSON.stringify(loginForm), this.httpOptions ).pipe(switchMap(res => of({ username: loginForm.username, token: res['jwt-token'] })));
    return this.http.post<{"jwt-token":string}>(this.AUTH_URL+"/login", JSON.stringify(loginForm), this.httpOptions ).pipe(
      map(res => {
        return { username: loginForm.username, token: res['jwt-token'] }
    }));
  }

  getUserToken(): string | null {
    return this.userLoggedSubject$.value ? this.userLoggedSubject$.value.token : null;
  }

  setLoggedUser(loggedUser: User | null) {
    this.userLoggedSubject$.next(loggedUser);
  }

  getUserLogged(): Observable<User | null> {
    return this.userLoggedSubject$.asObservable();
  }

  isLoggedIn(): boolean {
    return this.userLoggedSubject$.value ? !!this.userLoggedSubject$.value.token : false;
  }

  logout() {
    this.setLoggedUser(null);
  }

}
