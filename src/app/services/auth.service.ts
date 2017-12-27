import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Identifier } from '../models/Identifier';


@Injectable()
export class AuthService {

  constructor(public http: HttpClient) { }

  login(identifier: Identifier) {

    if ('' != identifier.userId) {
      console.log("--" + identifier);
      return new Promise((resolve, reject) => {
        this.http.get<Identifier>('http://localhost:3000/auth/user/' + identifier.userId, { observe: 'response' })
          .toPromise()
          .then(userData => {
            
            if (userData.status === 200 && userData.body.password === identifier.password) {
              console.log("validated..");
              resolve(userData);
              
              
            } else {
              reject();
            }
          },
          err => reject(err));
      });
    }
  }

  register(identifier: Identifier) {

    if ('' != identifier.userId && '' != identifier.password && '' != identifier.email) {
      console.log("--" + identifier);
      return new Promise((resolve, reject) => {
        this.http.post<Identifier>('http://localhost:3000/auth',identifier, { observe: 'response' })
          .toPromise()
          .then(userData => {
            
            if (userData.status === 200) {
              console.log("validated..");
              resolve(userData);
              
              
            } else {
              reject();
            }
          },
          err => reject(err));
      });
    }
  }

  

}
