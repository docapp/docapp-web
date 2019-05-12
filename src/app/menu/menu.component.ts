import { Component, OnInit, Input } from '@angular/core';
import {LoginService} from '../login/login.service';
import { Subscription }   from 'rxjs';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  subscription: Subscription;
  name : String = "";
  surname : String = "";


  constructor(    
    public loginService: LoginService,
    
    ) { 
      this.subscription = loginService.name$.subscribe(
        res => {
          this.name = res;
      });
      this.subscription = loginService.surname$.subscribe(
        res => {
          this.surname = res;
      });

    }

  ngOnInit() {
  }

}
