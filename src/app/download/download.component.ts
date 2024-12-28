import {Component} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [NgIf, CommonModule, TranslatePipe],
  templateUrl: './download.component.html',
  styleUrl: './download.component.css',
})
export class DownloadComponent {
  // downloadItems = [
  //   {
  //     imageUrl: 'assets/images/download-1.png',
  //     title: 'Complete Link Building Guide for Beginners',
  //     buttonText: 'Download Now'
  //   },
  //   {
  //     imageUrl: 'assets/images/download-2.png',
  //     title: 'Complete SEO Guide for Beginners',
  //     buttonText: 'Download Now'
  //   },
  //   {
  //     imageUrl: 'assets/images/download-3.png',
  //     title: 'Complete Content Marketing Guide for Beginners',
  //     buttonText: 'Download Now'
  //   }
  // ];
  downloadItems = [];
}
