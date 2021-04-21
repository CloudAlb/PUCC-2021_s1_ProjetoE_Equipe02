import { Component, Input, NgModule, OnInit } from '@angular/core';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss'],
})
export class MenuLateralComponent implements OnInit {
  private name = '';
  private username = '';
  private avatarPath = 'assets/icons/defaultIcon.svg';

  public appPages = [
    { title: 'Home', url: 'home', icon: 'home' },
    { title: 'Seu perfil', url: 'seu-perfil', icon: 'person' },
    { title: 'Criar Torneio', url: 'criar-torneio', icon: 'trophy' },
    { title: 'Torneios', url: '/tournament', icon: 'trophy' },
    { title: 'Amigos', url: '/folder/Amigos', icon: 'heart' },
    { title: 'Loja', url: 'loja', icon: 'bag' },
    { title: 'Cadastro', url: '/cadastro', icon: 'add' },
    { title: 'Login', url: '/login', icon: 'add' },
  ];

  @Input('contentId') public contentId: string;
  @Input('side') public side: string;

  constructor(private sessionsService: SessionsService) {}

  ngOnInit() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    const { name, username, avatar_image } = this.sessionsService.getUserData();

    this.name = name;
    this.username = username;
    if (avatar_image) this.avatarPath = avatar_image;
  }
}
