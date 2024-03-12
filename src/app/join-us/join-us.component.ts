import { Component } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-join-us',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
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

  constructor(private service: ServiceService) {}

  submitForm(form: NgForm): void {
    if (form.valid) {
      console.log('Form submitted:', this.formData);
      this.service.openSnackBar('Your Form has been successfully submitted');
    } else {
      this.service.openSnackBar('Please fill in all the details in the form');
    }
  }
}
