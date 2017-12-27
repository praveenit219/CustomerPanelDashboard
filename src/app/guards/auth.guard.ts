import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Identifier } from '../models/Identifier';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthStatus } from '../models/AuthStatus';
import { AuthstatusService } from '../services/authstatus.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public http: HttpClient, private router: Router,
        private cookieService: CookieService, private authStatusService: AuthstatusService) {  }

    canActivate(): Observable<boolean> {
        this.loginStatusCheck();
        if(this.isLoggedIn){
            console.log('inside canactivate true'+this.isLoggedIn);
            return Observable.create(observer => {
                observer.next(true);
                observer.complete();
            });
        } else {
            console.log('inside canactivate false'+this.isLoggedIn);
            
                this.router.navigateByUrl('/login');
                return Observable.create(observer => {
                    observer.next(false);
                    observer.complete();
                });
        }

        
    }






    authStatus: AuthStatus = {
        email: '',
        userId: '',
        id: '',
        loggedin: false
    };
    callStatus: number;
    isLoggedIn: boolean;

    loginStatusCheck() {
        console.log('inside login status check from cookie');
        if (this.cookieService.get('userstatus') === 'loggedin') {
            console.log('inside loginStatusCheck if ');
            this.isLoggedIn = true;
            this.authStatus.loggedin = true;
            this.authStatus.userId = this.cookieService.get('userdetails');


        } else {
            console.log('inside loginStatusCheck else ');
            this.isLoggedIn = false;
        }
    }




}
