import { Injectable } from '@angular/core';
//import { Http } from '@angular/http';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Customer } from '../models/customer';
import { CustomerResponse } from '../models/CustomerResponse';

@Injectable()
export class CustomerService {

  //customers: Customer[];

  constructor(public http: HttpClient) { }

  getCustomers(){
    return this.http.get<Customer[]>('http://localhost:3000/clients',{observe: 'response'});

    // .map(({_id, balance, email, firstName, lastName, phone}) => ({id: _id, firstName: firstName, lastName: lastName, phone: phone, email: email}));
  }

  addCustomer(customer: Customer) {

    console.log(customer);
    return this.http.post<Customer>('http://localhost:3000/clients', customer,{observe: 'response'});

  }

  getCustomer(id: String){
    return this.http.get<Customer>('http://localhost:3000/clients/'+id,{observe: 'response'});

    // .map(({_id, balance, email, firstName, lastName, phone}) => ({id: _id, firstName: firstName, lastName: lastName, phone: phone, email: email}));
  }


  deleteCustomer(id: String) {
    return this.http.delete('http://localhost:3000/clients/' + id,{observe: 'response'});
    
  }

  updateCustomer(id: String, customer: Customer) {
    return this.http.put('http://localhost:3000/clients/' + id, customer, {observe: 'response'})
      
  }

}


