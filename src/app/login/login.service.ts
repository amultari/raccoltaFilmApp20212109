import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "../model/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(loginForm: User): Observable<User>{
    return of({ username: loginForm.username, token: "123456"});
    //return this.http.post<User>("login", JSON.stringify(loginForm));
  }
}
