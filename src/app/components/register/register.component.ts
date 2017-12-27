import { Component, OnInit, NgZone } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthstatusService } from '../../services/authstatus.service';
import { Identifier } from '../../models/Identifier';
import { AuthStatus } from '../../models/AuthStatus';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  constructor(private authService: AuthService,
    private router: Router,
    private _falshMessagesService: FlashMessagesService,
    private authStatusService: AuthstatusService,
    private ngZone: NgZone) {
    console.log("register here");
   }

  ngOnInit() {
    console.log("register init here");
  }
  callStatus: number;
  customerRegistered: boolean = false;

  onSubmit({ value, valid }: { value: Identifier, valid: boolean }) {
    if (valid) {
      console.log(value);

      this.authService.register(value)
        .then((res: Response) => {
          this.callStatus = res.status;
          //this.identifier = res.body; 
          console.log(this.callStatus + "--" + res);
          if (this.callStatus == 200) {
            console.log("inside vaildation making to true");
            this.customerRegistered = true;
            //this.doUpdateLoginStatus();

          }
          // 
          //
        })
        .then(() => {
          if (this.customerRegistered) {
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
    this.authStatus.loggedin = false;

    this.authStatusService.createLoginStatus(this.authStatus).subscribe((res) => {
      this.callStatus = res.status;

      if (this.callStatus == 200) {
       
        
       
        this.ngZone.run(() => {
          this.router.navigate(['/login']);
         
        });
        this._falshMessagesService.show('You are successfully registered please login to see dashboard', { cssClass: 'alert-success', timeout: 4000 });
        
        
        
      } else {
        this._falshMessagesService.show("something went wrong cannot update customer status", { cssClass: 'alert-danger', timeout: 4000 });
        this.router.navigate(['']);
      }

    });




  }

}
