import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ToastService } from 'angular-toastify';
import { CarouselService } from 'src/app/home/carousel/carousel.service';

@Component({
  selector: 'app-carousel-settings',
  templateUrl: './carousel-settings.component.html',
  styleUrls: ['./carousel-settings.component.css']
})
export class CarouselSettingsComponent implements OnInit {
  carouselSettingsForm!: FormGroup;
  carouselImages!: {url: string, header: string, text: string, alt: string}[]
  image: {url: string, header: string, text: string, alt: string} = {url: "", header: "", text: "", alt: ""}

  constructor(private carouselService: CarouselService,
    private _toastService: ToastService) { }

  ngOnInit(): void {
    this.carouselSettingsForm = new FormGroup({
      interval: new FormControl(this.carouselService.interval),
      wrap: new FormControl(this.carouselService.wrap),
      keyboard: new FormControl(this.carouselService.keyboard),
      pauseOnHover: new FormControl(this.carouselService.pauseOnHover),
      showNavigationArrows: new FormControl(this.carouselService.showNavigationArrows),
      showNavigationIndicators: new FormControl(this.carouselService.showNavigationIndicators),
    })
    this.carouselImages = this.carouselService.images;
  }

  onSubmit() {
    let values = this.carouselSettingsForm.value;
    this.carouselService.interval = values.interval;
    this.carouselService.wrap = values.wrap;
    this.carouselService.keyboard = values.keyboard;
    this.carouselService.pauseOnHover = values.pauseOnHover;
    this.carouselService.showNavigationArrows = values.showNavigationArrows;
    this.carouselService.showNavigationIndicators = values.showNavigationIndicators;
    this._toastService.warn("Edukalt seaded muudetud");
  }

  onImageSubmit() {
    this.carouselService.images.push(this.image);
  }

  // onImageFormSubmit(form: NgForm) {
  //   let formValue = form.value;
  //   let url = formValue.url;
  //   let header = formValue.header;
  //   let text = formValue.text;
  //   let alt = formValue.alt;
  //   this.carouselService.images.push(
  //     {url: url, header: header, text: text, alt: alt}
  //   )
  // }

  onDeleteImage(i: number) {
    this.carouselService.images.splice(i,1);
  }
}
