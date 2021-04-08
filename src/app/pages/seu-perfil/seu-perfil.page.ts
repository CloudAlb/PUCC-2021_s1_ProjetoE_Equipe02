import { Component, NgModule, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserInfo } from 'src/app/models/DTO/user-info';
import { UserSocialResponse } from 'src/app/models/DTO/user-social-response';

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
    // TODO, pode dar erro depois?
    this.socials.shift();

    this.loadUserInfo();
  }

  private loadUserInfo() {
    // TODO, try catch ou outra tratativa de erros

    this.seuPerfilService.getUser().subscribe((response) => {
      if (!response.data) return;

      this.user = response;

      if (response.data.avatarImage) this.backgroundPath = response.data.avatarImage;
      if (response.data.backgroundImage) this.backgroundPath = response.data.backgroundImage;
    });

    this.seuPerfilService.getUserSocial().subscribe((response) => {
      if (!response.data) return;

      if (response.data.telegram) this.socials.push({ social: this.Telegram, username: response.data.telegram });
      if (response.data.facebook) this.socials.push({ social: this.Facebook, username: response.data.facebook });
      if (response.data.twitter) this.socials.push({ social: this.Twitter, username: response.data.twitter });
      if (response.data.twitch) this.socials.push({ social: this.Twitch, username: response.data.twitch });
    })
  };

  private ionViewWillEnter(): void {
    console.log("teste");
  }
}
