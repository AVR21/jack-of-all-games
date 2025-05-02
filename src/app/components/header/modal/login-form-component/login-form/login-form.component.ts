import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-login-form',
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
showPassword = signal(false);
type_text = signal('password');

eye = signal('bi bi-eye-slash');
visualizationPasword()
{
  this.showPassword.set(!this.showPassword());
  this.showPassword() ? this.type_text.set('text') : this.type_text.set('password');
  this.showPassword() ? this.eye.set('bi bi-eye') : this.eye.set('bi bi-eye-slash');
}

}
