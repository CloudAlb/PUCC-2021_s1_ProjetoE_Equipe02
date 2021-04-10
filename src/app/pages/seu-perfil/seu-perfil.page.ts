import { Component, NgModule, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserInfo } from 'src/app/models/user-info';
import { UserSocialResponse } from 'src/app/models/user-social-response';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';

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

  constructor(private seuPerfilService: SeuPerfilService,
    private localStorageService: LocalStorageService,
    private sessionManagerService: SessionManagerService) { }

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

  // TODO, continuar
  private ionViewWillEnter(): void {
  }
}
