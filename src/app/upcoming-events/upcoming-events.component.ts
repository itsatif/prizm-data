import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-upcoming-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upcoming-events.component.html',
  styleUrl: './upcoming-events.component.css'
})
export class UpcomingEventsComponent implements OnInit {
  events = [
    {
      "imageUrl": "assets/images/event1.jpg",
      "date": "28 DECEMBER, 2023",
      "title": "Event 1 Title",
      "description": "Description of Event 1",
      "details": "Details of Event 1"
    },
    {
      "imageUrl": "assets/images/event2.jpg",
      "date": "30 DECEMBER, 2023",
      "title": "Event 2 Title",
      "description": "Description of Event 2",
      "details": "Details of Event 2"
    },
    {
      "imageUrl": "assets/images/event3.jpg",
      "date": "02 JANUARY, 2024",
      "title": "Event 3 Title",
      "description": "Description of Event 3",
      "details": "Details of Event 3"
    }
  ]
  recentPosts = [
    {
      "imageUrl": "assets/images/img-1.jpg",
      "title": "Social Media For Promote Business.",
      "date": "15 October"
    },
    {
      "imageUrl": "assets/images/img-2.jpg",
      "title": "Marketing For Base market watch",
      "date": "15 October"
    },
    {
      "imageUrl": "assets/images/img-3.jpg",
      "title": "Condtum Integer urna at faucibus",
      "date": "15 October"
    }
  ]

  ngOnInit(): void {
    this.events = []
    this.recentPosts = []
  }
}
