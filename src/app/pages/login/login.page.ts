import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private login = "MAlb";
  private password = "12345678";

  constructor(private sessionManagerService: SessionManagerService,
    private sessionsService: SessionsService,
    private ionToastService: IonToastService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  postLogin(login: string, password: string) {
    // TODO, colocar mensagem pro usuário "Por favor, aguarde... com IonLoading"
    this.sessionsService.postLogin({ login, password }).subscribe((response) => {
      if (response.status) {
        this.ionToastService.presentToast(response.message, "bottom");
        return;
      }

      this.sessionManagerService.setToken(response.token.token);
      this.sessionsService.setUserData();

      this.router.navigate(['/home'], { relativeTo: this.route.parent }).then(() => { });
    });
  }

}
