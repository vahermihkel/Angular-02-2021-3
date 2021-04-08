import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  interval: number = 3000;
  wrap: boolean = true;
  keyboard: boolean = true;
  pauseOnHover: boolean = true;
  showNavigationArrows: boolean = true;
  showNavigationIndicators: boolean = true;
  images: {url: string, header: string, text: string, alt: string}[] = [{url: "https://picsum.photos/id/1/900/500", header: "Ole rohkem", text: "Saa rohkem", alt: "Tee rohkem"},{url: "https://picsum.photos/id/3/900/500", header: "Näe rohkem", text: "Kuule rohkem", alt: "Tee rohkem"}];

  constructor() { }
}
