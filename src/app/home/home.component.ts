import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AsyncPipe, isPlatformBrowser, NgForOf, NgIf } from '@angular/common';
import { Blogs, BlogsService } from '../blogs/blogs.service';
import { Observable } from 'rxjs';
import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgForOf, NgIf, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  blogs$: Observable<Blogs[]> = new Observable<Blogs[]>();
  isSoundOn: boolean = false;
  source: AudioBufferSourceNode | null = null;
  reviews: any = [];
  barsHeight: number[][] = [
    [2, 13],
    [5, 22],
    [17, 8],
    [4, 18],
    [11, 3],
  ];
  interval: any;
  duration: number = 5000;
  @ViewChild('swiper', { static: false }) swiperContainer: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    @Inject(BlogsService) private blogsService: BlogsService,
  ) {}

  ngOnInit(): void {
    this.blogs$ = this.blogsService.blogs$;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.playOSSound();
      this.equalizerAnimation('.equalizer', 180, this.barsHeight);
      this.initializeOwlCarousel();
      const mySwiper: Swiper = new Swiper(this.swiperContainer?.nativeElement, {
        // Swiper options here
        // For example:
        slidesPerView: 1,
        spaceBetween: 30,
      });
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
      const spans = equalizer.querySelectorAll('span');
      spans.forEach((span, idx) => {
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

  initializeOwlCarousel(): void {
    const animatedEl: any = document.querySelectorAll('.swiper-wrapper');
    const owlItem: any = document.querySelectorAll('.swiper-slide');
    const screenSize: number =
      window.innerWidth > 1440 ? 1440 : window.innerWidth;
    const width: number = screenSize * 7;
    const counterList: number[] = [0, 1, 2].map((it) => it * screenSize);
    owlItem.forEach((item): void => {
      if (item?.style) {
        item.style.width = screenSize + 'px';
      }
    });
    animatedEl.forEach((node): void => {
      if (node?.style) {
        let counterIndex: number = 0;
        setInterval((): void => {
          if (counterIndex < counterList.length) {
            node.style.transform = `translate3d(-${counterList[counterIndex]}px, 0px, 0px)`;
            counterIndex++;
          } else {
            counterIndex = 0;
          }
        }, 2000);
      }
    });
  }
}