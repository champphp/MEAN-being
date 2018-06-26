import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-create',
  templateUrl: './address-create.component.html',
  styleUrls: ['./address-create.component.css']
})
export class AddressCreateComponent implements OnInit {

  addressFrom: FormGroup;
  address: string = '';
  id: string = '';
  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, private formBuider: FormBuilder) { }

  ngOnInit() {
    this.addressFrom = this.formBuider.group({
      'address': [null, Validators.required]
    });
    this.id = this.route.snapshot.params['id'];
  }

  onFormSubmit(form: NgForm) {
    this.api.postAddress(form, this.id)
      .subscribe(res => {
        this.router.navigate(['/customer-details', this.id]);
      }, (err) => {
        console.log(err);
      });
  }

}
