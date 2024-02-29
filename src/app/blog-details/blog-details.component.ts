import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Blogs, BlogsService} from "../blogs/blogs.service";
import {map, Observable, switchMap} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.css'
})
export class BlogDetailsComponent implements OnInit {
  blog$: Observable<Blogs> = new Observable<Blogs>();
  recentPosts: Blogs[] = [];

  constructor(private route: ActivatedRoute, private blogService: BlogsService) {
  }

  ngOnInit(): void {
    this.blog$ = this.route.params.pipe(
      switchMap((param: Params) =>
        this.blogService.blogs$.pipe(
          map((blogs: Blogs[]) => {
            const idx: number = blogs.findIndex((blog: Blogs): boolean => blog.slug === param?.['slug']);
            const currentBlog: Blogs = blogs[idx > -1 ? idx : 0];
            this.recentPosts = blogs.filter((blog: Blogs): boolean => blog.slug !== currentBlog.slug);
            return currentBlog;
          })
        )
      )
    );
  }
}
