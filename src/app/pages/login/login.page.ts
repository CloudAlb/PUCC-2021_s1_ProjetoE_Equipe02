import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { SeuPerfilService } from 'src/app/services/seu-perfil.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public fGroup: FormGroup;

  constructor(
    private fBuilder: FormBuilder,
    private sessionManagerService: SessionManagerService,
    private sessionsService: SessionsService,
    private ionToastService: IonToastService,
    private router: Router,
    private route: ActivatedRoute,
    private seuPerfilService: SeuPerfilService,
    private localStorageService: LocalStorageService
  ) {
    this.fGroup = this.fBuilder.group({
      login: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ]),
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  ngOnInit() {}

  async onSubmit() {
    this.sessionsService
      .postLogin({
        login: this.fGroup.get('login').value,
        password: this.fGroup.get('password').value,
      })
      .subscribe(async (response) => {
        if (!response.token) {
          await this.ionToastService.presentToast(response.message, 'bottom');
          return;
        }

        this.sessionManagerService.setToken(response.token.token);

        this.seuPerfilService
          .getUser(response.token.id_user)
          .subscribe((response) => {
            this.localStorageService.setUserInfo({
              id_user: response.data.id_user,
              name: response.data.name,
              username: response.data.username,
              avatar_image: response.data.avatarImage,
            });
          });

        this.router
          .navigate(['/home'], { relativeTo: this.route.parent })
          .then(() => {});
      });
  }
}
