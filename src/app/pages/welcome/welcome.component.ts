import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  appHeaderTitle: string = "Application header" //Texto del header  
  avatarImagePath: string = 'assets/default-avatar-thumbnail.png'; //Imagen del avatar del usuario
  userName: string = "John" //Nombre del usuario
  
  sidebarOpen: boolean = false; //Status del sidebar

  greetingMessage: string = ''; // Mensaje de bienvenida
  currentTime: string = ''; // Hora actual en formato {h:mm AM/PM}
  menuOptions: any[] = [ //Opciones a mostrar en el menú lateral y en los cards del contenido.
    { title: 'Feature 1', content: 'Feature 1 description.', imagePath: 'assets/default-card-image.png'},
    { title: 'Feature 2', content: 'Feature 2 description.', imagePath: 'assets/default-card-image.png' },
    { title: 'Feature 3', content: 'Feature 3 description.', imagePath: 'assets/default-card-image.png' },
    { title: 'Feature N', content: 'Feature N description.', imagePath: 'assets/default-card-image.png' }
  ];

  constructor() {
    this.setGreetingMessage(); //Mostrar saludo acorde a la hora
    this.updateTime(); //Mostrar la hora actual
    setInterval(() => { //Actualizar hora periodicamente 
      this.updateTime();
    }, 1000); 
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  setGreetingMessage() {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      this.greetingMessage = `¡Good morning, ${this.userName}!` ;
    } else if (hour >= 12 && hour < 18) {
      this.greetingMessage = `Good afternoon, ${this.userName}!`;
    } else {
      this.greetingMessage = `¡Good evening!, ${this.userName} !`;
    }
  }

  updateTime() {
    var now = new Date();
    this.currentTime = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
  }
}