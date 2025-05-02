import {Component, output, signal} from '@angular/core';
import {AuthService} from '../../../../../services/auth/auth.service';
import {User} from '@angular/fire/auth';

@Component
({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent
{
  email = signal("");
  username = signal("");
  password = signal("");

  constructor(private authService : AuthService) {
  }

  UserAdd = output<User>()

  registerUser ()
  {
    if(this.email && this.username && this.password())
    {
      this.authService.signup(this.email(), this.username(), this.password()).subscribe(
        {
          next: result =>
          {
            console.log("Register User Added: ", result.user.displayName);
          },
          error: error =>
          {
            console.log(error);
          }
        });
    }
  }
}
