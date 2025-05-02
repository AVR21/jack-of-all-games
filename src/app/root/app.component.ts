import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
})
export class AppComponent {
  title = 'Jack Of All Games';
}
