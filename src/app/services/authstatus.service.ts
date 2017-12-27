import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Identifier } from '../models/Identifier';
import { AuthStatus } from '../models/AuthStatus';

@Injectable()
export class AuthstatusService {

  constructor(public http: HttpClient) { }

  updateLoginStatus(id: String, authStatus: AuthStatus) {
    return this.http.put('http://localhost:3000/auth/user/authstatus/' + id, authStatus , { observe: 'response' });
      
  }

  createLoginStatus(authStatus: AuthStatus) {
    return this.http.post('http://localhost:3000/auth/user/authstatus/' , authStatus , { observe: 'response' });
      
  }

  getLoginStatus(userId: String){
    return this.http.get('http://localhost:3000/auth/user/authstatus/' + userId, { observe: 'response' });
  }
  
}

