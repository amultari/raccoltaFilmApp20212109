import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {User} from "../../../models/user";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: User;
  username: string = "";

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  save(loginForm: NgForm) {
    this.authService.login(loginForm.value).subscribe(res => {
      if(res){
        this.authService.setUserLogged(res);
        this.route.navigateByUrl("welcome");
      }

    });
  }
}
