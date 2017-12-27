import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthstatusService } from '../../services/authstatus.service';
import 'rxjs/add/operator/map';
import { Identifier } from '../../models/Identifier';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cookieValue = 'UNKNOWN';
  cookieExists: boolean = false;

  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private authStatusService: AuthstatusService,
    private router: Router,
    private flashMessageService: FlashMessagesService,
    private cookieService: CookieService
  ) { 
    console.log('here in dashboard constructor');
  }

  identifier: Identifier = {
    email: '',
    password: '',
    userId: '',
    id: ''
  };
  

  /* ngOnDestroy() {
    
    this.cookieService.deleteAll;
    console.log('cookie destryed ... calling destroy');
 } */
 
 
 

  ngOnInit() {
    console.log('inside dashboard initi');


    if (this.cookieService.check('userstatus') && this.cookieService.check('userdetails')) {

      this.cookieExists = true;
      console.log('making cookie exists here....');
      this.loginStatusCheck();
    } else {
      console.log('making cookie Unknow here becz....'+this.cookieService.check('userstatus')+this.cookieService.check('userdetails'));
      this.cookieService.set('userstatus', this.cookieValue,120);
      this.cookieService.set('userdetails', this.cookieValue,120);
    }
    
  }

  loginStatusCheck() {
    console.log('inside loginstatus check '+this.cookieService.get('userstatus')+
  (this.cookieService.get('userstatus') === 'loggedin'));
    if (this.cookieExists && this.cookieService.get('userstatus') === 'loggedin') {
      this.identifier.userId = this.cookieService.get('userdetails');
      console.log('cookie identifier userid is : ' + this.identifier.userId);


      this.authStatusService.getLoginStatus(this.identifier.userId).subscribe(res => {
        if (res) {
          
          
          
          console.log("res:" + res);
        } else {
         
          console.log("in else");
        }
      })
    }
  }

}
