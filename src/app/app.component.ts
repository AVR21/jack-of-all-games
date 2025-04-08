import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component'; 
import { AchievementCardComponent } from './achievement-card/achievement-card.component'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // Referencia al propio template del AppComponent
  styleUrls: ['./app.component.css'],  // Archivo de estilos del AppComponent (opcional)
  standalone: true,
  imports: [HeaderComponent, FooterComponent, AchievementCardComponent],
})
export class AppComponent {
  title = 'jack-of-all-games';
}
