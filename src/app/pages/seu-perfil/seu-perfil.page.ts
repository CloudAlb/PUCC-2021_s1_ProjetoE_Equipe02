import { Component, NgModule, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserInfo } from 'src/app/models/DTO/user-info';
import { UserSocials } from 'src/app/models/DTO/user-socials';

import { SeuPerfilService } from 'src/app/services/seu-perfil.service';

@Component({
  selector: 'app-seu-perfil',
  templateUrl: './seu-perfil.page.html',
  styleUrls: ['./seu-perfil.page.scss'],
})
export class SeuPerfilPage implements OnInit {
  private backgroundPath = "assets/backgrounds/defaultBackground.jpg";
  private avatarPath = "assets/icons/defaultIcon.svg";

  private Telegram = "assets/icons/logo-telegram.svg";
  private Facebook = "assets/icons/logo-facebook.svg";
  private Twitter = "assets/icons/logo-twitter.svg";
  private Twitch = "assets/icons/logo-twitch.svg";

  private user: UserInfo;
  private socials: [{}] = [{}];

  constructor(private seuPerfilService: SeuPerfilService) { }

  ngOnInit() {
    this.loadUserInfo();
  }

  private loadUserInfo() {
    this.seuPerfilService.getUser().subscribe((response) => {
      // TODO, try catch ou outra tratativa de erros
      if (!response.data) return;

      this.user = response;

      if (response.data.avatarImage) this.backgroundPath = response.data.avatarImage;
      if (response.data.backgroundImage) this.backgroundPath = response.data.backgroundImage;

      this.socials.shift();
      if (response.data.socials.telegram) this.socials.push({ social: this.Telegram, username: response.data.socials.telegram });
      if (response.data.socials.facebook) this.socials.push({ social: this.Facebook, username: response.data.socials.facebook });
      if (response.data.socials.twitter) this.socials.push({ social: this.Twitter, username: response.data.socials.twitter });
      if (response.data.socials.twitch) this.socials.push({ social: this.Twitch, username: response.data.socials.twitch });
    });
  }
}
