import { Component, Input, OnInit, OnDestroy, AfterViewInit, QueryList, ElementRef, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  standalone: true
})
export class CarouselComponent implements OnInit, AfterViewInit, OnDestroy {

  // Permite inyectar los datos para cada instancia del carousel
  @Input() items: any[] = []; // Puedes definir una interfaz para mayor tipado
  // Genera o recibe un ID para evitar conflictos en los radio buttons
  @Input() carouselId: string = 'carousel-' + Math.floor(Math.random() * 10000);

  // Variables internas para la lógica del carousel
  currentIndex = 0;
  autoSlideInterval = 3000;
  private autoSlideTimer: any;

  // Usamos ViewChildren para acceder a los elementos "item" generados en el template
  @ViewChildren('itemElement') itemElements!: QueryList<ElementRef>;

  ngOnInit(): void {
    // Iniciar el auto slide al arrancar
    this.startAutoSlide();
  }

  ngAfterViewInit(): void {
    // Se puede aplicar la primera actualización del carousel
    this.updateCarousel();
  }

  ngOnDestroy(): void {
    if (this.autoSlideTimer) {
      clearInterval(this.autoSlideTimer);
    }
  }

  startAutoSlide(): void {
    this.autoSlideTimer = setInterval(() => {
      this.changeSlide();
    }, this.autoSlideInterval);
  }

  // Lógica para actualizar las transformaciones de cada "slide"
  updateCarousel(): void {
    const totalItems = this.items.length;
    // Aseguramos que ya se hayan renderizado los elementos
    if (!this.itemElements || totalItems === 0) { return; }

    this.itemElements.forEach((elemRef, i) => {
      let offset = i + 1;
      // Cálculo similar al del JS original para un desplazamiento cíclico
      let r = ((this.currentIndex + 1 - offset + totalItems) % totalItems);
      if (r > totalItems / 2) r -= totalItems;
      let absR = Math.abs(r);
      // Escala mayor al item activo (por ejemplo, el actual vale 1.2, los demás 1)
      let scale = i === this.currentIndex ? 1.2 : 1;

      elemRef.nativeElement.style.transition = "transform 0.8s ease-in-out";
      elemRef.nativeElement.style.transform = `rotateY(${-10 * r}deg) translateX(${-300 * r}px) scale(${scale})`;
      elemRef.nativeElement.style.zIndex = totalItems - absR;
    });
  }

  // Cambia de slide; si se proporciona un índice lo usa, si no, avanza automáticamente
  changeSlide(index?: number): void {
  const totalItems = this.items.length;
  if (typeof index === 'number') {
  this.currentIndex = index;
} else {
  this.currentIndex = (this.currentIndex + 1) % totalItems;
}
this.updateCarousel();
}

// Métodos para ser llamados desde botones "prev" y "next"
prevSlide(): void {
  if (this.autoSlideTimer) {
  clearInterval(this.autoSlideTimer);
}
const totalItems = this.items.length;
this.currentIndex = (this.currentIndex - 1 + totalItems) % totalItems;
this.changeSlide(this.currentIndex);
this.startAutoSlide();
}

nextSlide(): void {
  if (this.autoSlideTimer) {
  clearInterval(this.autoSlideTimer);
}
this.changeSlide();
this.startAutoSlide();
}

// Método para cuando se hace click en un item
onItemClick(index: number): void {
  if (this.autoSlideTimer) {
  clearInterval(this.autoSlideTimer);
}
this.changeSlide(index);
this.startAutoSlide();
}
}
