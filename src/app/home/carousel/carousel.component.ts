import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { CarouselService } from './carousel.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  // images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);
  images: {url: string, header: string, text: string, alt: string}[] = [];

  constructor(private config: NgbCarouselConfig,
    private carouselService: CarouselService) {
  }

  ngOnInit(): void {
    this.images = this.carouselService.images;
    this.config.interval = this.carouselService.interval;
    this.config.wrap = this.carouselService.wrap;
    this.config.keyboard = this.carouselService.keyboard;
    this.config.pauseOnHover = this.carouselService.pauseOnHover;
    if (this.images.length > 1) {
      this.config.showNavigationArrows = this.carouselService.showNavigationArrows;
      this.config.showNavigationIndicators = this.carouselService.showNavigationIndicators;
    } else {
      this.config.showNavigationArrows = false;
      this.config.showNavigationIndicators = false;
    }
  }

}
