import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {

  addressFrom: FormGroup;
  address: string = '';
  id_cus: string = '';
  id: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getAddressI(this.route.snapshot.params['id']);
    this.addressFrom = this.formBuilder.group({
      'address': [null, Validators.required]
    });
    this.id = this.route.snapshot.params['id'];
    this.id_cus = this.route.snapshot.params['cus_id']
  }

  getAddressI(id) {
    // alert(id);
    this.api.getAddress(id).subscribe(data => {
      this.addressFrom.setValue({
        address: data.address
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.updateAddress(this.id, form)
      .subscribe(res => {
          this.router.navigate(['/customer-details', this.id_cus]);
        }, (err) => {
          console.log(err);
        }
      );
  }

  addressDetails() {
    this.router.navigate(['/customer-details', this.id_cus]);
  }

}
