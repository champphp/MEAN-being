import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  cus = {};

  constructor(private route:ActivatedRoute,private api:ApiService,private router:Router) { }

  ngOnInit() {
    this.getCustomerDetails(this.route.snapshot.params['id']);
  }

  getCustomerDetails(id) {
    this.api.getCustomerI(id)
      .subscribe(data => {
        this.cus = data;
      });
  }

  deleteCus(id) {
    this.api.deleteCustomer(id)
      .subscribe(res => {
          this.router.navigate(['/customers']);
        }, (err) => {
          console.log(err);
        }
      );
  }

  deleteAddress(cus_id,add_id){
    this.api.deleteAddress(add_id).subscribe(res =>{
      this.getCustomerDetails(cus_id);
    }),(err) => {
      console.log(err);
    }
  }

}
