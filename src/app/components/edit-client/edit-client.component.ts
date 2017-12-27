import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Customer } from '../../models/Customer';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: String;
  customer: Customer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }
  disableBalanceOnEdit:boolean = false;
  callStatus: number;


  constructor(
    public customerService: CustomerService,
    public settingsService: SettingsService,
    public router: Router,
    public route: ActivatedRoute,
    public flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.customerService.getCustomer(this.id).subscribe(res => {
      this.callStatus = res.status;
       this.customer = res.body;
    });
    console.log("edit balance --"+this.settingsService.getSettings().disableBalanceOnEdit);
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({ value, valid }: { value: Customer, valid: boolean }) {
    if (!valid) {
      this.flashMessagesService.show('Please fill in all the required fields', { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['edit-client/'+this.id]);
    } else {
      console.log(value);
     
      this.customerService.updateCustomer(this.id, value).subscribe(res => {
        this.callStatus = res.status;
        this.customer = res.body;
       // console.log(res.headers);
       //console.log(this.callStatus);
       console.log(res);
       if( this.callStatus == 200) {
        this.flashMessagesService.show('Customer updated', { cssClass: 'alert-success', timeout: 4000 });
        this.router.navigate(['/client/'+this.id]);

       }
        //this.flashMessagesService.show('Added a new Customer', { cssClass: 'alert-success', timeout: 4000 });
        //this.users.unshift(user);
    });
      //this.flashMessagesService.show('Added a new Customer', { cssClass: 'alert-success', timeout: 4000 });
      //this.router.navigate([''])
    }
  }
}
