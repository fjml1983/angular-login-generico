import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  autocompleteEnabled = false;

  toggleAutocomplete(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.autocompleteEnabled = target.checked;
    }
  }
}
