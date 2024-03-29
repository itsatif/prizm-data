import { Component } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormService } from '../sharedServices/form.service';

@Component({
  selector: 'app-speak-to-an-expert',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './speak-to-an-expert.component.html',
  styleUrl: './speak-to-an-expert.component.css',
})
export class SpeakToAnExpertComponent {
  formData: any = {
    name: '',
    phoneNumber: '',
    email: '',
    message: '',
    companyname: '',
  };

  constructor(
    private service: ServiceService,
    private router: Router,
    private formService: FormService,
  ) {}

  submitForm(form: NgForm): void {
    if (form.valid) {
      console.log('Form submitted:', this.formData);
      this.formService.submitContactQuery(this.formData).subscribe((res) => {
        console.log(res);
      });
      this.service.openSnackBar('Your Form has been successfully submitted');
      this.router.navigate(['thank-you-page']);
    } else {
      this.service.openSnackBar('Please fill in all the details in the form');
    }
  }
}
