import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormService } from './sharedServices/form.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FooterComponent,
    NavBarComponent,
    HttpClientModule,
  ],
  providers: [HttpClientModule, FormService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'prizm-data';
  isSoundOn: boolean = false;
  source: AudioBufferSourceNode | null = null;
  barsHeight: number[][] = [
    [2, 13],
    [5, 22],
    [17, 8],
    [4, 18],
    [11, 3],
  ];
  top: number = 50;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event): void => {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
          if (event.url === '/') {
            this.top = 100;
          } else {
            this.top = 50;
            this.isSoundOn = false;
          }
        }
      });
      if (this.top === 100) {
        this.playOSSound();
        setTimeout((): void => {
          this.playOSSound();
        }, 2000);
      }
      this.equalizerAnimation('.equalizer', 180, this.barsHeight);
    }
  }

  equalizerAnimation(
    selector: string,
    speed: number,
    barsHeight: number[][],
  ): void {
    const equalizer = document.querySelector(selector);
    if (!equalizer) return;

    let animationInterval: NodeJS.Timeout;

    function randomBetween(min: number, max: number): number {
      return min + Math.random() * (max - min);
    }

    function animateBars(): void {
      const spans: NodeListOf<HTMLSpanElement> =
        equalizer.querySelectorAll('span');
      spans.forEach((span: HTMLSpanElement, idx: number): void => {
        const height = randomBetween(barsHeight[idx][0], barsHeight[idx][1]);
        (span as HTMLElement).style.height = `${height}px`;
      });
    }

    function startAnimation(): void {
      if (animationInterval) return;
      animateBars();
      animationInterval = setInterval(animateBars.bind(this), speed);
    }

    function stopAnimation(): void {
      if (!animationInterval) return;
      clearInterval(animationInterval);
      animationInterval = null;
    }

    animationInterval = setInterval(animateBars.bind(this), speed);

    equalizer.addEventListener('click', (event: Event): void => {
      event.preventDefault();
      event.stopPropagation();
      equalizer.classList.toggle('paused');
      if (equalizer.classList.contains('paused')) {
        stopAnimation();
        this.isSoundOn = false;
      } else {
        startAnimation();
        this.isSoundOn = true;
      }
      this.playOSSound();
    });
  }

  /**
   * @description Plays system sound for macOS.
   */
  playOSSound(): void {
    const audioContext: AudioContext = new AudioContext();
    const audioUrl: string = 'assets/audio/audio.mp3';

    if (this.isSoundOn) {
      this.isSoundOn = false;
      fetch(audioUrl)
        .then((response: Response) => response.arrayBuffer())
        .then((buffer: ArrayBuffer) => audioContext.decodeAudioData(buffer))
        .then((decodedData: AudioBuffer): void => {
          this.source = audioContext.createBufferSource();
          this.source.buffer = decodedData;
          this.source.connect(audioContext.destination);
          this.source.start(0);
        })
        .catch((error): void => {
          console.error('Error loading and decoding audio:', error);
        });
    } else {
      this.isSoundOn = true;
      if (this.source) {
        this.source.stop();
      }
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isSoundOn = false;
      this.playOSSound();
    }
  }
}
