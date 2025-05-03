import {Component, EventEmitter, Input, Output, OnInit, OnDestroy, Renderer2, ElementRef,} from '@angular/core';
import { Game } from '../../models/game';
import { GameCardComponent } from '../game-card/game-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [GameCardComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit, OnDestroy {
  @Input({ required: true }) games: Game[] = [];
  @Output() cardClicked = new EventEmitter<string>();

  position = 2;
  private intervalId: any;

  constructor(private renderer: Renderer2, private elRef: ElementRef, private router: Router) {}

  ngOnInit(): void {
    this.intervalId = setInterval(() => this.goNext(), 3500);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  goNext() {
    this.position++;

    if (this.position > this.games.length + 2) {
      setTimeout(() => {
        this.disableTransition();
        this.position = 2;
        this.forceReflow();
        this.enableTransition();
      }, 20);
    }
  }

  goPrev() {
    this.position--;

    if (this.position < 1) {
      setTimeout(() => {
        this.disableTransition();
        this.position = this.games.length + 2;
        this.forceReflow();
        this.enableTransition();
      }, 20);
    }
  }



  getImage(game: Game): string {
    return game.media?.img?.[0] ?? '/public/images/logo.png';
  }

  private disableTransition() {
    this.renderer.addClass(this.elRef.nativeElement, 'no-transition');
  }

  private enableTransition() {
    setTimeout(() => {
      this.renderer.removeClass(this.elRef.nativeElement, 'no-transition');
    }, 10);
  }

  private forceReflow() {
    this.elRef.nativeElement.offsetHeight;
  }

  selectCard(id: string) {
    this.router.navigate(['game'], {queryParams: {gid: id}});
  }

}
