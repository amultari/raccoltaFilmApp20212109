import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userLoggedSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor() { }

  login(loginForm: User): Observable<User> {
    return of({ username: loginForm.username, token: "123456" });
    //return this.http.post<User>("login", JSON.stringify(loginForm));
  }

  setLoggedUser(loggedUser: User | null) {
    this.userLoggedSubject$.next(loggedUser);
  }

  getUserLogged(): Observable<User | null> {
    return this.userLoggedSubject$.asObservable();
  }

  logout() {
    this.setLoggedUser(null);
  }

}
