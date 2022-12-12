import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {User} from "../../model/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private userLoggedSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);


  constructor(private http: HttpClient) { }

  setUserLogged(user: User | null){
    this.userLoggedSubject$.next(user);
  }

  getUserLogged(): Observable<User | null>{
    return this.userLoggedSubject$.asObservable();
  }

  isLoggedIn(): boolean {
    return this.userLoggedSubject$.value ? !!this.userLoggedSubject$.value.token : false;
  }

  getUserRole(): "ADMIN" | "USER" | null {
    return this.userLoggedSubject$.value ? this.userLoggedSubject$.value.role : null;
  }

  getUserToken(): string | null {
    return this.userLoggedSubject$.value ? this.userLoggedSubject$.value.token : null;
  }

  login(loginForm: User): Observable<User>{
    return of({ username: loginForm.username, token: "123456", role: "ADMIN"});
    //return this.http.post<User>("login", JSON.stringify(loginForm));
  }

  logout() {
    this.setUserLogged(null);
  }
}
