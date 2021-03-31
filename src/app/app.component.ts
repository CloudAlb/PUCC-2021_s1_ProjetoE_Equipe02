import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' },
    { title: 'Seu perfil', url: 'seu-perfil', icon: 'person' },
    { title: 'Torneios', url: '/folder/Torneios', icon: 'trophy' },
    { title: 'Amigos', url: '/folder/Amigos', icon: 'heart' },
    { title: 'Loja', url: '/folder/Loja', icon: 'bag' },
    { title: 'Cadastro', url: '/cadastro-usuario', icon: 'add' },
    { title: 'Login', url: '/login-usuario', icon: 'add' },
  ];
  constructor() {}
}
