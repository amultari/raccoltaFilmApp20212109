import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {LoginService} from "./login.service";
import {Router} from "@angular/router";
import {User} from "../model/user";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: User;
  errorMessage: string = "";
  username: string = "";

  constructor(private loginService: LoginService, private route: Router) { }

  ngOnInit(): void {
  }

  save(loginForm: NgForm) {
    this.loginService.login(loginForm.value).subscribe(res => {
      this.route.navigateByUrl("welcome");
    });
  }
}
