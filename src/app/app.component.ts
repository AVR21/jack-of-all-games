import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // Referencia al propio template del AppComponent
  styleUrls: ['./app.component.css'],  // Archivo de estilos del AppComponent (opcional)
  standalone: true,
  imports: [HeaderComponent]  // Importa el HeaderComponent para poder usarlo en el template
})
export class AppComponent {
  title = 'jack-of-all-games';
}
