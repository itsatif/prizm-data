import { Component } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {
  formData: any = {
    name: '',
    phoneNumber: '',
    email: '',
    message: '',
  };

  constructor(
    private service: ServiceService,
    private router: Router,
  ) {}

  submitForm(form: NgForm): void {
    if (form.valid) {
      console.log('Form submitted:', this.formData);
      this.service.openSnackBar('Your Form has been successfully submitted');
      this.router.navigate(['thank-you-page']);
    } else {
      this.service.openSnackBar('Please fill in all the details in the form');
    }
  }
}
