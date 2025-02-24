import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatIconModule, TranslatePipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  toggleSideNav: boolean = false;
  toggleServices: boolean = false;
  toggleResources: boolean = false;
  selectedLanguage: string = 'en';

  constructor(private router: Router, private translate: TranslateService, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('lang')) {
      this.translate.setDefaultLang(localStorage.getItem('lang'));
      document.dir = localStorage.getItem('lang') === 'ar' ? 'rtl' : 'ltr';
      this.selectedLanguage = localStorage.getItem('lang');
    }
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.router.events.subscribe((event): void => {
      if (event instanceof NavigationEnd) {
        this.toggleSideNav = false;
        this.toggleServices = false;
        this.toggleResources = false;
      }
    });
  }

  changeLanguage(lang: any): void {
    console.log(lang.value);
    this.selectedLanguage = lang.value;
    this.translate.use(lang.value);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang.value);
      document.dir = lang.value === 'ar' ? 'rtl' : 'ltr';
    }
  }
}
