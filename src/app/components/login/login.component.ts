import { Component, OnInit, NgZone } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthstatusService } from '../../services/authstatus.service';
import { Identifier } from '../../models/Identifier';
import { AuthStatus } from '../../models/AuthStatus';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  identifier: Identifier = {
    email: '',
    password: '',
    userId: '',
    id: ''
  };

  authStatus: AuthStatus = {
    email: '',
    userId: '',
    id: '',
    loggedin: false
  };

  callStatus: number;
  customerValidated: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private _falshMessagesService: FlashMessagesService,
    private authStatusService: AuthstatusService,
    private cookieService: CookieService,
    private ngZone: NgZone
    
  ) { }

  ngOnInit() {
  }

  onSubmit({ value, valid }: { value: Identifier, valid: boolean }) {
    if (valid) {
      console.log(value);

      this.authService.login(value)
        .then((res: Response) => {
          this.callStatus = res.status;
          //this.identifier = res.body; 
          console.log(this.callStatus + "--" + res);
          if (this.callStatus == 200) {
            console.log("inside vaildation making to true");
            this.customerValidated = true;
            //this.doUpdateLoginStatus();

          }
          // 
          //
        })
        .then(() => {
          if (this.customerValidated) {
            console.log("calling asynchronous way");
            this.doUpdateLoginStatus();
            console.log("done calling");
          }
        })

        .catch((err) => {
          this._falshMessagesService.show(err.message, { cssClass: 'alert-danger', timeout: 4000 });
          this.router.navigate(['/login']);
        });


    }
  }

  doUpdateLoginStatus() {

    console.log("inside the customer vaidations ");
    this.authStatus.email = this.identifier.email;
    this.authStatus.userId = this.identifier.userId;
    this.authStatus.loggedin = true;

    this.authStatusService.updateLoginStatus(this.authStatus.userId, this.authStatus).subscribe((res) => {
      this.callStatus = res.status;

      if (this.callStatus == 200) {
        var today = new Date();
        var expiresValue = new Date(today);
        expiresValue.setMinutes(today.getMinutes() + 15);
        this.cookieService.set('userstatus', 'loggedin', expiresValue);
        this.cookieService.set('userdetails', String(this.authStatus.userId), expiresValue);
        
        console.log('customer login status updated to true'+this.cookieService.check('userstatus')+this.cookieService.check('userdetails'));
        this.ngZone.run(() => {
          this.router.navigate(['//']);
         
        });
        this._falshMessagesService.show('You are logged in', { cssClass: 'alert-success', timeout: 4000 });
        
        
        
      } else {
        this._falshMessagesService.show("something went wrong cannot update customer status", { cssClass: 'alert-danger', timeout: 4000 });
        this.router.navigate(['']);
      }

    });




  }

}
