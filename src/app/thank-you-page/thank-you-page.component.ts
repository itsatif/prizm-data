import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-thank-you-page',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './thank-you-page.component.html',
  styleUrl: './thank-you-page.component.css',
})
export class ThankYouPageComponent {}
