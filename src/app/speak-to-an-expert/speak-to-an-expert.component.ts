import { Component } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-speak-to-an-expert',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
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
