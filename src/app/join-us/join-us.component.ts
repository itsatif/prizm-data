import { Component } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormService } from '../sharedServices/form.service';

@Component({
  selector: 'app-join-us',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './join-us.component.html',
  styleUrl: './join-us.component.css',
})
export class JoinUsComponent {
  formData: any = {
    fname: '',
    lname: '',
    zip: '',
    email: '',
    country: '',
    companyname: '',
    designation: '',
    dob: '',
    currency: '',
  };

  constructor(
    private service: ServiceService,
    private router: Router,
    private formService: FormService,
  ) {}

  submitForm(form: NgForm): void {
    if (form.valid) {
      console.log('Form submitted:', this.formData);
      this.formData.name = this.formData.fname + ' ' + this.formData.lname;
      this.formService.submitContactQuery(this.formData).subscribe((res) => {
        console.table(res);
      });
      this.service.openSnackBar('Your Form has been successfully submitted');
      this.router.navigate(['thank-you-page']);
    } else {
      this.service.openSnackBar('Please fill in all the details in the form');
    }
  }
}
