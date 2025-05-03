  import {Component, output, signal} from '@angular/core';
  import {AuthService} from '../../../../../services/auth/auth.service';
  import {user, User} from '@angular/fire/auth';
  import { Modal } from 'bootstrap';
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
    submitted = signal(false);

    constructor(private authService : AuthService) {
    }

    emailValid()    { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email()); }
    usernameValid() { return this.username().trim().length >= 3; }
    passwordValid() {
      const value = this.password();
      const ok = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
      console.log('password =', value, '→', ok);
      return ok;
    }
    formValid()     { return this.emailValid() && this.usernameValid() && this.passwordValid(); }


    UserAdd = output<User>()

    registerUser (event: Event) : void
    {

      event.preventDefault();
      event.stopPropagation();
      this.submitted.set(true);

      if (!this.formValid()) {
        console.log('Formulario inválido – el modal permanece abierto');
        return; }

      this.authService.signup(this.email(), this.password(), this.username())
        .subscribe({
          next: () => {
            console.log('Registro correcto');
            console.log(this.email(), this.password(), this.username())
            const el = document.getElementById('exampleModal');
            if (el) Modal.getOrCreateInstance(el).hide();   // cierra solo si OK
          },
          error: err => console.error('Error en el registro', err)
        });
      }
  }
