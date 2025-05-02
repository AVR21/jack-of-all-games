import {Component, input, signal} from '@angular/core';
import {User} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AuthService} from '../../../../../services/auth/auth.service';
@Component({
  selector: 'app-login-form',
  imports: [],
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
visualizationPassword()
{
  this.showPassword.set(!this.showPassword());
  this.showPassword() ? this.type_text.set('text') : this.type_text.set('password');
  this.showPassword() ? this.eye.set('bi bi-eye') : this.eye.set('bi bi-eye-slash');
}

  userLogin()
  {
      if(this.email() && this.password())
      {
        this.authService.login(this.email(), this.password()).subscribe(
          {
            next: result =>
            {
              console.log(" User Logged: ", result.user.displayName);
            },
            error: error =>
            {
              console.log(error);
            }
          });
      }
  }

  protected readonly input = input;
}
