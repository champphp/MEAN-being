import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customerForm: FormGroup;
  id: string = '';
  email: string = '';
  name: string = '';
  password: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }



  ngOnInit() {
    this.getBook(this.route.snapshot.params['id']);
    this.customerForm = this.formBuilder.group({
      'email': [null, Validators.required],
      'name': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  getBook(id) {
    this.api.getCustomerI(id).subscribe(data => {
      this.id = data._id;
      this.customerForm.setValue({
        email: data.email,
        name: data.name,
        password: data.password
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.updateCustomer(this.id,form)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['/customer-details', id]);
      }, (err) => {
        console.log(err);
      }
      );
  }

  customerDetails() {
    this.router.navigate(['/customer-details', this.id]);
  }

}
