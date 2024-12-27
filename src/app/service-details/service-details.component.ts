import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute, Params} from '@angular/router';
import {Service, ServiceService} from '../services/service.service';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-service-details',
  standalone: true,
  imports: [NgForOf, NgIf, TranslatePipe],
  templateUrl: './service-details.component.html',
  styleUrl: './service-details.component.css',
})
export class ServiceDetailsComponent implements OnInit {
  contentData: Service | any = {};

  constructor(
    private route: ActivatedRoute,
    private service: ServiceService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params): void => {
      if (param?.['slug']) {
        this.contentData = this.service.serviceDetails.find(
          (service: Service): boolean => service.slug === param?.['slug'],
        );
      }
    });
  }
}
