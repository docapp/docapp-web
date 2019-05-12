import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoginService} from './login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    public loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router) { }
    
  user;
  ngOnInit() {
  }

  onLogin(loginForm :NgForm){
    let dni = loginForm.value.dni;
    let pass = loginForm.value.password;
    this.loginService.login(dni, pass).subscribe(res => {
      this.user = res;
      this.loginService.changeUser(this.user.name, this.user.surname, this.user.dni);
      this.router.navigate(['/appointments']);
    });
    
  }

}
