import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {User} from "../../model/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userLogged$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  _userLogged$: Observable<User | null> = this.userLogged$.asObservable();


  constructor(private http: HttpClient) { }

  setUserLogged(user: User | null){
    this.userLogged$.next(user);
  }

  getUserLogged(): Observable<User | null>{
    return this._userLogged$;
  }

  isLoggedIn(): boolean {
    return this.userLogged$.value ? !!this.userLogged$.value.token : false;
  }

  getUserRole(): "ADMIN" | "USER" | null {
    return this.userLogged$.value ? this.userLogged$.value.role : null;
  }

  getUserToken(): string | null {
    return this.userLogged$.value ? this.userLogged$.value.token : null;
  }

  login(loginForm: User): Observable<User>{
    return of({ username: loginForm.username, token: "123456", role: "USER"});
    //return this.http.post<User>("login", JSON.stringify(loginForm));
  }

  logout() {
    this.setUserLogged(null);
  }
}
