import {Component, input, signal} from '@angular/core';
import {User} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AuthService} from '../../../../../services/auth/auth.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-login-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
showPassword = signal(false);
type_text = signal('password');
email=signal('');
password=signal('');
constructor(private authService : AuthService) {
}


eye = signal('bi bi-eye-slash');
togglePassword()
{
  this.showPassword.set(!this.showPassword());
  this.showPassword() ? this.type_text.set('text') : this.type_text.set('password');
  this.showPassword() ? this.eye.set('bi bi-eye') : this.eye.set('bi bi-eye-slash');
}

  userLogin(ev: Event): void {
    ev.preventDefault();

    if (!this.email() || !this.password()) { return; }

    this.authService.login(this.email(), this.password())
      .subscribe({
        next: ({ user }) => {
          console.log('User logged:', user?.displayName ?? user?.email);

          /* cierra el modal con la API de Bootstrap 5 */
          const el = document.getElementById('exampleModal');
        },
        error: e => console.error(e)
      });
  }

  protected readonly input = input;
}
