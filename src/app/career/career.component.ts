import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../services/service.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../sharedServices/form.service';

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
    file: null,
  };

  /**max file size 5mb*/
  maxSize = 5 * 1024 * 1024;

  constructor(
    private service: ServiceService,
    private router: Router,
    private formService: FormService,
  ) {}

  ngOnInit(): void {}

  submitForm(form: NgForm): void {
    if (form.valid) {
      const formData = new FormData();
      formData.append('name', this.formData.name);
      formData.append('phoneNumber', this.formData.phoneNumber);
      formData.append('email', this.formData.email);
      formData.append('message', this.formData.message);
      formData.append('location', this.formData.location);
      formData.append('file', this.formData.file);
      this.formService
        .submitCareerQuery(formData)
        .subscribe((response): void => {});
      this.service.openSnackBar('Your Form has been successfully submitted');
      this.router.navigate(['thank-you-page']);
    } else {
      this.service.openSnackBar('Please fill in all the details in the form');
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const fileSize = file.size;
      if (fileSize > this.maxSize) {
        event.target.value = null;
        this.service.openSnackBar('Please select a file less than 3MB');
      } else {
        this.formData.file = file;
      }
    }
  }
}
