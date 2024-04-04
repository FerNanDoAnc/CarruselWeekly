import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import Swiper from 'swiper';
import { EquiposService } from './services/equipos.service';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppComponent {
  title = 'CarruselWeekly';
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  swiper!: Swiper;
  equiposList: any = [];

  constructor(
    private svcEquipos: EquiposService
  ) {
    this.svcEquipos.getAllEquipos().subscribe((data: any) => {
      this.equiposList= data;
    });
  }

  ngAfterViewInit(){
    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: false,
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 50
        }
      }
    });
  }
}
