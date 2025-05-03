import { Component, Input, signal } from '@angular/core';
import { Game } from '../../../models/game';

interface CarouselItem {
  title: string;
  // añade aquí los campos que necesites (imagen, enlace, etc.)
}

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  /** ID único para enlazar los radio buttons */
  @Input() carouselId = `carousel-${Math.random().toString(36).substr(2, 9)}`;

  /** Elementos a mostrar en el carrusel */
  //@Input() items: string[] = [];

  // Propuesta, en vez de pasar items de tipo interfaz lo que sea, le pasas objetos de tipo Game o tuplas de titulo + imgPath
  @Input() items!: Game[];


  /** Índice de la diapositiva activa */
  currentIndex = signal(0);

  /** Cambia directamente a la diapositiva `i` */
  changeSlide(i: number): void {
    this.currentIndex.set(i);
  }

  /** Diapositiva anterior (con wrap-around) */
  prevSlide(): void {
    const last = this.items.length - 1;
    const prev = this.currentIndex() > 0 ? this.currentIndex() - 1 : last;
    this.currentIndex.set(prev);
  }

  /** Diapositiva siguiente (con wrap-around) */
  nextSlide(): void {
    const last = this.items.length - 1;
    const next = this.currentIndex() < last ? this.currentIndex() + 1 : 0;
    this.currentIndex.set(next);
  }

  /** Handler al hacer click sobre un ítem (índice `i`) */
  onItemClick(i: number): void {
    // por ejemplo, podemos cambiar a esa slide
    this.changeSlide(i);

    // o emitir un evento, navegar, etc.
    console.log(`Item ${i} clicked:`, this.items[i]);
  }
}
