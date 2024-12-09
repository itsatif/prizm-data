import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  AsyncPipe,
  CommonModule,
  isPlatformBrowser,
  NgForOf,
  NgIf,
} from '@angular/common';
import { Blogs, BlogsService } from '../blogs/blogs.service';
import { Observable } from 'rxjs';
import Swiper from 'swiper';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { FormService } from '../sharedServices/form.service';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

declare var $: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    MatSnackBarModule,
    FormsModule,
    CommonModule,
    MatButton,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        query('.counter-block', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(300, [
            animate(
              '2s ease-out',
              style({ opacity: 1, transform: 'translateY(0)' }),
            ),
          ]),
        ]),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  formData: any = {
    name: '',
    phoneNumber: '',
    email: '',
    message: '',
  };
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
  right: number = 1000;
  @ViewChild('swiper', { static: false }) swiperContainer: ElementRef;
  counterIndex: any = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    @Inject(BlogsService) private blogsService: BlogsService,
    private snackBar: MatSnackBar,
    private el: ElementRef,
    private router: Router,
    private formService: FormService,
  ) {}

  ngOnInit(): void {
    this.blogs$ = this.blogsService.blogs$;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.playOSSound();
      this.equalizerAnimation('.equalizer', 180, this.barsHeight);
      this.initializeOwlCarouselINS();
      const mySwiper: Swiper = new Swiper(this.swiperContainer?.nativeElement, {
        slidesPerView: 1,
        spaceBetween: 30,
      });
      setTimeout((): void => {
        this.playOSSound();
      }, 2000);
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

  initializeOwlCarousel(direction: 'left' | 'right'): void {
    const sliderEl = document.querySelector<HTMLElement>('.banner-slider');
    const animatedEls =
      document.querySelectorAll<HTMLElement>('.banner-slider');
    const owlItems = document.querySelectorAll<HTMLElement>('.item');
    const screenSize = window.innerWidth ?? 1440;

    if (sliderEl) {
      sliderEl.style.width = `${screenSize * 3}px`;
    }
    const counterList: number[] = [0, 1, 2].map((it) => it * screenSize);

    owlItems.forEach((item): void => {
      if (item?.style) {
        item.style.width = screenSize + 'px';
      }
    });

    animatedEls.forEach((node): void => {
      if (node?.style) {
        if (!this.counterIndex) {
          this.counterIndex = 0;
        }

        if (direction === 'right') {
          this.counterIndex = (this.counterIndex + 1) % counterList.length;
        } else if (direction === 'left') {
          this.counterIndex =
            (this.counterIndex - 1 + counterList.length) % counterList.length;
        }
        this.right = counterList[this.counterIndex];
        node.style.transform = `translate3d(-${counterList[this.counterIndex]}px, 0px, 0px)`;
      }
    });
  }

  initializeOwlCarouselINS(): void {
    const sliderEl = document.querySelector<HTMLElement>('.banner-slider');
    const animatedEls =
      document.querySelectorAll<HTMLElement>('.banner-slider');
    const owlItems = document.querySelectorAll<HTMLElement>('.item');
    const screenSize = window.innerWidth ?? 1440;

    if (sliderEl) {
      sliderEl.style.width = `${screenSize * 3}px`;
    }
    const counterList: number[] = [0, 1, 2].map((it) => it * screenSize);
    this.counterIndex = 0;
    this.right = counterList[this.counterIndex];
    owlItems.forEach((item): void => {
      console.log(item);
      if (item?.style) {
        item.style.width = screenSize + 'px';
      }
    });
    animatedEls.forEach((node): void => {
      console.log(node);
      if (node?.style) {
        let counterIndex: number = 0;
        // setInterval((): void => {
        //   if (counterIndex < counterList.length) {
        //     node.style.transform = `translate3d(-${counterList[counterIndex]}px, 0px, 0px)`;
        //     counterIndex++;
        //   } else {
        //     counterIndex = 0;
        //   }
        // }, 80000000);
      }
    });
  }

  submitForm(form: NgForm): void {
    if (form.valid) {
      console.log('Form submitted:', this.formData);
      this.formService.submitContactQuery(this.formData).subscribe((res) => {
        console.log(res);
      });
      this.openSnackBar('Your Form has been successfully submitted');
      this.router.navigate(['thank-you-page']);
    } else {
      this.openSnackBar('Please fill in all the details in the form');
    }
  }

  scrollToBottom(): void {
    this.el.nativeElement.ownerDocument.defaultView.scrollTo({
      top: this.el.nativeElement?.offsetHeight,
      behavior: 'smooth',
    });
  }

  openSnackBar(message: string): void {
    const config: MatSnackBarConfig<any> = new MatSnackBarConfig();
    config.horizontalPosition = 'center';
    config.verticalPosition = 'bottom';
    config.duration = 3000;
    this.snackBar.open(message, 'OK', config);
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isSoundOn = false;
      this.playOSSound();
    }
  }
}
