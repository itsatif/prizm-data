import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor() {}

  toggleMenu() {
    const navigationMenu = document.querySelector(
      '.navigation-menu',
    ) as HTMLElement;
    const hamburger = document.querySelector('.hamburger') as HTMLElement;
    const body = document.querySelector('body') as HTMLElement;

    if (navigationMenu.classList.contains('active')) {
      hamburger.classList.toggle('open');
      body.classList.toggle('overflow');
      navigationMenu.classList.remove('active');
      setTimeout(() => {
        document
          .querySelectorAll(
            '.navigation-menu .inner .menu, .navigation-menu .inner blockquote',
          )
          .forEach((element) => {
            (element as HTMLElement).style.transitionDelay = '0s';
          });
        document
          .querySelectorAll('.navigation-menu .bg-layers span')
          .forEach((element) => {
            (element as HTMLElement).style.transitionDelay = '0.3s';
          });
      }, 0);
    } else {
      navigationMenu.classList.add('active');
      hamburger.classList.toggle('open');
      body.classList.toggle('overflow');
      setTimeout(() => {
        document
          .querySelectorAll('.navigation-menu.active .inner .menu')
          .forEach((element) => {
            (element as HTMLElement).style.transitionDelay = '0.45s';
          });
        document
          .querySelectorAll('.navigation-menu.active .inner blockquote')
          .forEach((element) => {
            (element as HTMLElement).style.transitionDelay = '0.50s';
          });
      }, 0);
    }
  }

  onPageLinkClick(event: Event) {
    const target = event.target as HTMLAnchorElement;
    const url = target.href;
    if (url && url.indexOf('#') !== -1) {
      const hash = url.substring(url.indexOf('#'));
      const targetElement = document.querySelector('body ' + hash);
      if (targetElement) {
        const navigationMenu = document.querySelector(
          '.navigation-menu',
        ) as HTMLElement;
        const hamburger = document.querySelector('.hamburger') as HTMLElement;
        const body = document.querySelector('body') as HTMLElement;

        document.querySelectorAll('.transition-overlay').forEach((element) => {
          element.classList.remove('active');
        });
        hamburger.classList.toggle('open');
        body.classList.toggle('overflow');
        navigationMenu.classList.remove('active');
        setTimeout(() => {
          document
            .querySelectorAll('.navigation-menu .inner ul')
            .forEach((element) => {
              (element as HTMLElement).style.transitionDelay = '0s';
            });
          document
            .querySelectorAll('.navigation-menu .inner blockquote')
            .forEach((element) => {
              (element as HTMLElement).style.transitionDelay = '0s';
            });
          document
            .querySelectorAll('.navigation-menu .bg-layers span')
            .forEach((element) => {
              (element as HTMLElement).style.transitionDelay = '0.3s';
            });
          window.scrollTo({
            top: (targetElement as HTMLElement).offsetTop,
            behavior: 'smooth',
          });
        }, 0);
      }
    }
  }

  openSubmenu(event): void {
    const id = event?.target?.id;
    // document.getElementById(id).classList.add('open');
  }
}
