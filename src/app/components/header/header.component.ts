import {Component, OnInit, signal} from '@angular/core';
import { ModalComponent } from './modal/modal.component';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [ModalComponent]
})
export class HeaderComponent implements OnInit
{
  isRegistered = signal(false);
  dropdownOpen = false;
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit()
  {
    this.auth.getAuthState().subscribe(state =>
    {
      if (state)
      {
        this.isRegistered.set(true);
        console.log("Fue mu bien");
      } else
      {
        console.log("algo fue mal");
      }
    })
  }

  logOut()
  {
    this.auth.logout().subscribe(
      {
        next: () => { this.isRegistered.set(false); },
        error: () => { console.log("logout"); },
      });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  goToProfile() {
    this.dropdownOpen = false;
    this.router.navigate(['/profile']);
  }


}
