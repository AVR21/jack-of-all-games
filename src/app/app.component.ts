import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import {CarouselComponent} from './main/carousel/carousel.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [HeaderComponent, CarouselComponent]
})
export class AppComponent {
  title = 'jack-of-all-games';
}
