import {Component, OnInit} from '@angular/core';
import {Blogs, BlogsService} from "./blogs.service";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit {
  blogs$: Observable<Blogs[]> = new Observable<Blogs[]>();

  constructor(private blogsService: BlogsService) {
  }

  ngOnInit(): void {
    this.blogs$ = this.blogsService.blogs$;
  }
}
