import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import {CarouselComponent} from './main/carousel/carousel.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component'; 
import { AchievementCardComponent } from './achievement-card/achievement-card.component'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CarouselComponent, FooterComponent, AchievementCardComponent],
})
export class AppComponent {
  title = 'jack-of-all-games';
}
