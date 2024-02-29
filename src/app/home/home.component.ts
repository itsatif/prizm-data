import {AfterViewInit, Component, Inject, OnInit, PLATFORM_ID, Renderer2} from '@angular/core';
import {AsyncPipe, isPlatformBrowser, NgForOf, NgIf} from "@angular/common";
import {Blogs, BlogsService} from "../blogs/blogs.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  blogs$: Observable<Blogs[]> = new Observable<Blogs[]>();
  isSoundOn: boolean = false;
  source: AudioBufferSourceNode | null = null;
  barsHeight: number[][] = [
    [2, 13],
    [5, 22],
    [17, 8],
    [4, 18],
    [11, 3],
  ];
  interval: any;
  duration: number = 5000;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private renderer: Renderer2, @Inject(BlogsService) private blogsService: BlogsService) {
  }

  ngOnInit(): void {
    this.blogs$ = this.blogsService.blogs$;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.playOSSound();
      this.equalizerAnimation('.equalizer', 180, this.barsHeight);
    }
  }

  equalizerAnimation(
    selector: string,
    speed: number,
    barsHeight: number[][]
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
}
