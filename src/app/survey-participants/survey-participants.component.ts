import { Component } from '@angular/core';
import { FormService } from '../sharedServices/form.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../services/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-participants',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './survey-participants.component.html',
  styleUrl: './survey-participants.component.css',
})
export class SurveyParticipantsComponent {
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
