import { Component, OnInit } from '@angular/core';
import { interval, Observable, scan, takeWhile } from 'rxjs';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css',
})
export class ServicesComponent implements OnInit {
  maxValues = {
    CLIENTS: 700,
    PROJECTS: 7,
    COUNTRIES: 35,
    SURVEY_RUNS: 13,
    B2B_SURVEYS: 4,
    TOTAL_RESPONDENTS: 8,
    SURVEYS_COMPLETED: 600,
  };

  counters: any = {};

  ngOnInit(): void {
    Object.keys(this.maxValues).forEach((key: string): void => {
      this.getCountObservable(0, this.maxValues[key]).subscribe(
        (count: number): void => {
          this.counters[key] = count;
        },
      );
    });
  }

  // Function to generate an observable that emits values with increasing counts
  getCountObservable(
    start: number,
    end: number,
    speed: number = 2,
  ): Observable<number> {
    const totalCounts: number = end - start + 1;
    return interval(speed).pipe(
      scan((count: number) => count + 1, start),
      takeWhile((count: number): boolean => count <= end),
    );
  }
}
