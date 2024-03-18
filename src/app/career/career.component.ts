import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../services/service.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-career',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './career.component.html',
  styleUrl: './career.component.css',
})
export class CareerComponent implements OnInit {
  jobOpenings = [];

  formData: any = {
    name: '',
    phoneNumber: '',
    email: '',
    message: '',
    location: '',
    file: '',
  };

  constructor(
    private service: ServiceService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

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
