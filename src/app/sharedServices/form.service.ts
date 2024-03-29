import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor(private http: HttpClient) {}

  submitCareerQuery(formData: FormData) {
    return this.http.post(
      'https://prizmdata.com/api/v1/user/career/query',
      formData,
    );
  }

  submitContactQuery(contactData: any) {
    const apiUrl = 'https://prizmdata.com/api/v1/user/contact/query';

    return this.http.post(apiUrl, contactData);
  }
}
