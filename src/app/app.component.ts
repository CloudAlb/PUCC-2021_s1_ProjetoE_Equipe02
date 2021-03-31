import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Feed', url: '/home', icon: 'home' },
    { title: 'Meu perfil', url: '/folder/Meu Perfil', icon: 'person' },
    { title: 'Torneios', url: '/folder/Torneios', icon: 'trophy' },
    { title: 'Amigos', url: '/folder/Amigos', icon: 'heart' },
    { title: 'Loja', url: '/folder/Loja', icon: 'bag' },
    { title: 'Cadastro', url: '/cadastro-usuario', icon: 'add' },
    { title: 'Login', url: '/login-usuario', icon: 'add' },
  ];
  constructor() {}
}
