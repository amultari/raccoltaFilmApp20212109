import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {User} from "../../model/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userLogged$: BehaviorSubject<User> = new BehaviorSubject<User>({});
  _userLogged$: Observable<User> = this.userLogged$.asObservable();


  constructor(private http: HttpClient) { }

  setUserLogged(user: User){
    this.userLogged$.next(user);
  }

  getUserLogged(): Observable<User>{
    return this._userLogged$;
  }

  isLoggedIn(): boolean {
    return !!this.userLogged$.value.token;
  }

  login(loginForm: User): Observable<User>{
    return of({ username: loginForm.username, token: "123456"});
    //return this.http.post<User>("login", JSON.stringify(loginForm));
  }

  logout() {
    this.setUserLogged({});
  }
}
