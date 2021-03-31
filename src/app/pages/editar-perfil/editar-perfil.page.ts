import { Component, OnInit } from '@angular/core';
import { IonAlertService } from 'src/app/services/ion-alert.service';
import { SeuPerfilService } from 'src/app/services/seu-perfil.service';
import { IonToastService } from 'src/app/services/ion-toast.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})

// TODO, validar campos
export class EditarPerfilPage implements OnInit {
  private logoTelegram = "assets/icons/logo-telegram.svg";
  private logoFacebook = "assets/icons/logo-facebook.svg";
  private logoTwitter = "assets/icons/logo-twitter.svg";
  private logoTwitch = "assets/icons/logo-twitch.svg";

  private alterPasswordShown = false;
  private buttonAlterPasswordShownText = "Mostrar";

  private placeholder = "...";
  private placeholder_bio = "...";

  private name = "";
  private username = "";
  private bio = "";
  private email = "";

  private telegram = "";
  private facebook = "";
  private twitter = "";
  private twitch = "";

  private password_old = "";
  private password_new = "";
  private password_confirm = "";

  private placeholder_telegram = "";
  private placeholder_facebook = "";
  private placeholder_twitter = "";
  private placeholder_twitch = "";

  constructor(private seuPerfilService: SeuPerfilService,
    private ionToastService: IonToastService,
    private ionAlertService: IonAlertService) { }

  ngOnInit() {
    this.loadUserEditInfo();
  }


  loadUserEditInfo() {
    this.seuPerfilService.getUser().subscribe((response) => {
      if (!response.data) return;

      this.placeholder = "";
      this.placeholder_bio = "Digite algo aqui...";

      this.name = response.data.name;
      this.username = response.data.username;
      if (response.data.bio) this.bio = response.data.bio;
      this.email = response.data.email;

      response.data.socials.telegram ? this.placeholder_telegram = "Sair como " + response.data.socials.telegram : this.placeholder_telegram = "Entrar com Telegram";
      response.data.socials.facebook ? this.placeholder_facebook = "Sair como " + response.data.socials.facebook : this.placeholder_facebook = "Entrar com Facebook";
      response.data.socials.twitter ? this.placeholder_twitter = "Sair como " + response.data.socials.twitter : this.placeholder_twitter = "Entrar com Twitter";
      response.data.socials.twitch ? this.placeholder_twitch = "Sair como " + response.data.socials.twitch : this.placeholder_twitch = "Entrar com Twitch";
    });
  }

  async editUserInfo() {
    this.ionAlertService.presentAlertMultipleButtons("Aviso", "Confirmar alterações?", [{
      text: "Sim",
      handler: () => {
        this.seuPerfilService.editUser({ name: this.name, username: this.username, bio: this.bio, email: this.email }).subscribe(async (data) => {
          await this.ionToastService.presentToast(data.message);
        });
      },
    }, {
      text: "Não",
      role: 'cancel'
    }]);
  }

  // TODO, ajeitar
  editUserSocialInfo() {
    this.seuPerfilService.editUserSocialInfo({ telegram: this.telegram, facebook: this.facebook, twitter: this.twitter, twitch: this.twitch }).subscribe(async (data) => {
      await this.ionToastService.presentToast(data.message);
    });
  }

  async editPassword() {
    if (this.password_old == "" || this.password_new == "" || this.password_confirm == "") {
      await this.ionToastService.presentToast("Por favor, informe todos os campos de senha.", "middle");
      return;
    }

    this.ionAlertService.presentAlertMultipleButtons("Aviso", "Confirmar alteração de senha?", [{
      text: "Sim",
      handler: async () => {
        if (this.password_new != this.password_confirm) {
          await this.ionToastService.presentToast("\"Senha nova\" e \"Confirme nova senha\" diferem.", "middle");
          return;
        }

        this.seuPerfilService.editPassword({ password_old: this.password_old, password_new: this.password_new }).subscribe(async (data) => {
          await this.ionToastService.presentToast(data.message);
        });
      },
    }, {
      text: "Não",
      role: 'cancel'
    }]);
  }

  hideChangePasswordModule() {
    this.alterPasswordShown = !this.alterPasswordShown;

    if (this.alterPasswordShown) this.buttonAlterPasswordShownText = "Esconder";
    else this.buttonAlterPasswordShownText = "Alterar";
  }
}
