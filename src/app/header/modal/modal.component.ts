import { Component, signal } from '@angular/core';
import {LoginFormComponent} from './login-form-component/login-form/login-form.component';
import {RegisterFormComponent} from './login-form-component/register-form/register-form.component';
@Component({
  selector: 'app-modal',
  imports: [LoginFormComponent, RegisterFormComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
registerSelection = signal(true);
changeRegisterSelection(sign : number) {
  if(sign == 0)
  {
    this.registerSelection.set(true);
  }else if(sign == 1) {
    this.registerSelection.set(false);
  }
}

}
