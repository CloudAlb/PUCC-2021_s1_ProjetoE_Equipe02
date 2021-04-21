import { Component, NgModule, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserInfo } from 'src/app/models/user-info';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';

import { SeuPerfilService } from 'src/app/services/seu-perfil.service';

@Component({
  selector: 'app-seu-perfil',
  templateUrl: './seu-perfil.page.html',
  styleUrls: ['./seu-perfil.page.scss'],
})
export class SeuPerfilPage implements OnInit {
  public backgroundPath = "assets/backgrounds/defaultBackground.jpg";
  public avatarPath = "assets/icons/defaultIcon.svg";

  public Telegram = "assets/icons/logo-telegram.svg";
  public Facebook = "assets/icons/logo-facebook.svg";
  public Twitter = "assets/icons/logo-twitter.svg";
  public Twitch = "assets/icons/logo-twitch.svg";

  public user: UserInfo;
  public socials: [{}] = [{}];

  constructor(public seuPerfilService: SeuPerfilService,
    public localStorageService: LocalStorageService,
    public sessionManagerService: SessionManagerService) { }

  ngOnInit() {
    this.socials.shift();

    this.loadUserInfo();
  }

  private loadUserInfo() {
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
    this.loadUserInfo();
  }
}
