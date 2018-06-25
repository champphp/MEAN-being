import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  custome: any;
  displayedColumns = ['email', 'name'];
  dataSource = new CustomerDataSource(this.api);
  
  constructor(private api: ApiService) { }
  ngOnInit() {
    this.api.getCustomer()
      .subscribe(res => {
        console.log(res);
        this.custome = res;
      }, err => {
        console.log(err);
      });
  }

}

export class CustomerDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super()
  }

  connect() {
    return this.api.getCustomer();
  }

  disconnect() {

  }
}
