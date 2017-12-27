import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
//import { Client } from '../../models/client';
import { Customer } from '../../models/Customer';
import { CustomerService } from '../../services/customer.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthstatusService } from '../../services/authstatus.service';
import { AuthStatus } from '../../models/AuthStatus';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  // clients:Client[];
  customers: Customer[] = [];
  totalOwed: number;

  //constructor(public clientService: ClientService, public customerService: CustomerService) { }
  constructor(public customerService: CustomerService,
    private cookieService: CookieService,
    private authStatusService: AuthstatusService) { }

  ngOnInit() {
    /* this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      console.log(this.clients);
    }); */

    this.loginStatusCheck();
    console.log('logged in status check... return' + this.isLoggedIn);
    if (this.isLoggedIn) {
      console.log('logged in so finding cusgomers... started' + this.isLoggedIn);
      this.customerService.getCustomers().subscribe(res => {
        console.log(res.status);

        this.customers = res.body;
        // console.log(this.customers);
        this.getTotalOwed();
        // console.log(res.status);
        //console.log(res);

      });
    } else {
      this.customers = [];
    }

  }

  getTotalOwed() {
    let total = 0;

    for (let i = 0; i < this.customers.length; i++) {
      total += this.customers[i].balance;
    }

    this.totalOwed = total;
    console.log(this.totalOwed);
  }

  isLoggedIn: boolean;
  authStatus: AuthStatus = {
    email: '',
    userId: '',
    id: '',
    loggedin: false
  };
  callStatus: number;

  loginStatusCheck() {
    console.log('loginstatusCheck... started');
    if (this.cookieService.get('userstatus') === 'loggedin') {
      this.isLoggedIn = true;
      this.authStatus.loggedin = true;
      this.authStatus.userId = this.cookieService.get('userdetails');


    } else {
      this.isLoggedIn = false;
    }
  }
}
