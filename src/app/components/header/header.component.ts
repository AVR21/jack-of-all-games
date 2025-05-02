import {Component, signal} from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [ModalComponent, RouterLink, RouterLinkActive]
})
export class HeaderComponent
{
  isRegistered = signal(false);

}
