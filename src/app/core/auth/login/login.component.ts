import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: Partial<User> = {
    username: '',
    password: ''
  };
  username: string = "";

  constructor(private route: Router, private authService:AuthService) { }

  ngOnInit(): void {
  }

  save(loginForm: NgForm) {
    this.authService.login(loginForm.value).subscribe(res => {
      if(res){
        this.authService.setLoggedUser(res);
        this.route.navigateByUrl("welcome");
      }

    });
  }

}
