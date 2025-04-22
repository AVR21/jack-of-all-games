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
visualizationPasword()
{
  this.showPassword.set(!this.showPassword());
  this.showPassword() ? this.type_text.set('text') : this.type_text.set('password');
}

}
