import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Customer } from '../../models/Customer';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  customer: Customer;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  callStatus: number;

  constructor(public customerService: CustomerService,
              public router:Router,
              public route:ActivatedRoute,
              public flashMessages: FlashMessagesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
    //console.log(this.id);
    this.customerService.getCustomer(this.id).subscribe(res => {
      this.callStatus = res.status;
      this.customer = res.body;
      if(this.customer.balance > 0  ){
        this.hasBalance = true;
      }
     // console.log(res.headers);
     //console.log(this.callStatus);
     console.log(res);
     if( this.callStatus == 200) {
      this.flashMessages.show('showing the details of Customer', { cssClass: 'alert-success', timeout: 4000 });
     //  if( this.callStatus == 200) {
     // this.flashMessages.show('showing the details of Customer', { cssClass: 'alert-success', timeout: 4000 });
      // this.router.navigate(['/'])
      }
     
     });
  }

  updateBalance(id:string){
    this.customerService.updateCustomer(this.id,this.customer).subscribe(res => {
      this.callStatus = res.status;
      this.customer = res.body;
      if( this.callStatus == 200) {
        this.flashMessages.show('Balance Updated', { cssClass: 'alert-success', timeout: 4000 });
        this.router.navigate(['/client/'+this.id]);
       }
    });
  }

  onDeleteClick(){
    if(confirm("Are you sure to delete ? ")){
      this.customerService.deleteCustomer(this.id).subscribe(res => {
        this.callStatus = res.status;
        if(this.callStatus == 200){
          this.flashMessages.show('customer deleted permanently', { cssClass: 'alert-success', timeout: 4000 });
          this.router.navigate(['/']);
        }
      })
    }
  }

}
