import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CadastroService } from 'src/app/services/cadastro.service';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit {
  public maxDate = '';

  public fGroup: FormGroup;

  constructor(
    public datepipe: DatePipe,
    private activatedRoute: ActivatedRoute,
    private fBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ionToastService: IonToastService,
    private cadastroService: CadastroService
  ) {
    this.maxDate = this.getTodayDate();

    this.fGroup = this.fBuilder.group({
      name: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      username: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ]),
      ],
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/),
        ]),
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      birth_date: [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {}

  private getTodayDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }

  onSubmit() {
    const date: string = this.fGroup.get('birth_date').value;
    const dateAsDate = new Date(date);
    const formattedDate = dateAsDate.toISOString();

    this.cadastroService
      .postCadastro({
        name: this.fGroup.get('name').value,
        username: this.fGroup.get('username').value,
        email: this.fGroup.get('email').value,
        password: this.fGroup.get('password').value,
        birth_date: formattedDate,
      })
      .subscribe(async (response) => {
        if (response.error) {
          await this.ionToastService.presentToast(response.error, 'bottom');
          return;
        }

        await this.ionToastService.presentToast(response.message, 'bottom');

        this.router
          .navigate(['/login'], { relativeTo: this.route.parent })
          .then(() => {});
      });
  }
}
