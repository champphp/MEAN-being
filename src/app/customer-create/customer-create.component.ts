import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customerFrom: FormGroup;
  email: string = '';
  name: string = '';
  password: string = '';
  constructor(private router: Router, private api: ApiService, private formBuider: FormBuilder) { }

  ngOnInit() {
    this.customerFrom = this.formBuider.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required],
      'name': [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    // console.log(form); return false;
    this.api.postCustomer(form)
      .subscribe(res => {
        let id = res['_id'];
        // this.router.navigate(['/book-details', id]);
        this.router.navigate(['/customers']);
      }, (err) => {
        console.log(err);
      });
  }

}
