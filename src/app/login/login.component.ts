import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(public loginService: LoginService) { }

  ngOnInit() {
  }

  onLogin(loginForm :NgForm){
    let dni = loginForm.value.dni;
    let pass = loginForm.value.password;
    this.loginService.login(dni, pass);
  }

}
