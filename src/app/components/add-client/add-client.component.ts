import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/Customer';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  customer: Customer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  callStatus: number;

  disableBalanceOnAdd: boolean = false;

  constructor(public customerService: CustomerService, 
    public settingsService: SettingsService,
    public flashMessagesService: FlashMessagesService, 
    public router: Router) { }

  ngOnInit() {
    console.log("add balance --"+this.settingsService.getSettings().disableBalanceOnAdd);
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({ value, valid }: { value: Customer, valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;

    }

    if (!valid) {
      this.flashMessagesService.show('Please fill in all the required fields', { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['add-client'])
    } else {
     // this.customerService.addCustomer(value);
      this.customerService.addCustomer(value).subscribe(res => {
        this.callStatus = res.status;
       // console.log(res.headers);
       //console.log(this.callStatus);
       console.log(res);
       if( this.callStatus == 200) {
        this.flashMessagesService.show('Added a new Customer', { cssClass: 'alert-success', timeout: 4000 });
        this.router.navigate(['/'])

       }
        //this.flashMessagesService.show('Added a new Customer', { cssClass: 'alert-success', timeout: 4000 });
        //this.users.unshift(user);
    });
      //this.flashMessagesService.show('Added a new Customer', { cssClass: 'alert-success', timeout: 4000 });
      //this.router.navigate([''])
    }

  }


}
