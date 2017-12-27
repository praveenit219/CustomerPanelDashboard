import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthstatusService } from '../../services/authstatus.service';
import 'rxjs/add/operator/map';
import { Identifier } from '../../models/Identifier';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { AuthStatus } from '../../models/AuthStatus';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser:String;
  showRegister: boolean;

  constructor(private authService: AuthService,
    private router: Router,
    private falshMessagesService: FlashMessagesService,
    private settingsService: SettingsService,
    private cookieService: CookieService,
    private authStatusService: AuthstatusService) {
    console.log('here in navbar constructor');
  }

  ngOnInit() {
    console.log('here in navbar init');
    this.loginStatusCheck();
    this.showRegister = this.settingsService.getSettings().allowRegistration;

  }

  authStatus: AuthStatus = {
    email: '',
    userId: '',
    id: '',
    loggedin: false
  };
  callStatus: number;

  loginStatusCheck() {

    if (this.cookieService.get('userstatus') === 'loggedin') {
      this.isLoggedIn = true;
      this.authStatus.loggedin = true;
      this.authStatus.userId = this.cookieService.get('userdetails');
      if (''!=this.authStatus.userId) {
        this.loggedInUser = this.authStatus.userId;
      }
        

    } else {
      this.isLoggedIn = false;
    }
  }

  onLogoutClick() {
    this.authStatus.loggedin = false;
    this.authStatusService.updateLoginStatus(this.authStatus.userId, this.authStatus).subscribe((res) => {
      this.callStatus = res.status;

      if (this.callStatus == 200) {

        console.log('updated user status');
        this.cookieService.deleteAll();
        this.falshMessagesService.show("You are logged out", { cssClass: 'alert-success', timeout: 4000 });
        this.router.navigate(['/login']);
      }
    });

  }

}
