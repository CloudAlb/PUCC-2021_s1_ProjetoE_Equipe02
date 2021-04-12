import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CadastroService } from 'src/app/services/cadastro.service';
import { IonToastService } from 'src/app/services/ion-toast.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit {
  public user = {
    nome: '',
    usuario: '',
    email: '',
    password: '',
    data_nascimento: '',
  };

  // esquema do Matheus
  private name = 'Matheus Albino';
  private username = 'MAlb';
  private email = 'malb@gmail.com';
  private password = '12345678';
  private birth_date = '2001-10-16';

  public maxDate = '';

  public fGroup: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fBuilder: FormBuilder,
    private ionToastService: IonToastService,
    private cadastroService: CadastroService
  ) {
    this.maxDate = this.getTodayDate();

    this.fGroup = this.fBuilder.group({
      nome: [
        null,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      usuario: [
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
      senha: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      data_nascimento: [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    //this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    // Serve para setar os dados no formulário
    // this.fGroup.get('nome').setValue()
  }

  private cadastrar(
    name: string,
    username: string,
    email: string,
    password: string,
    birth_date: string
  ) {
    this.cadastroService
      .postCadastro({ name, username, email, password, birth_date })
      .subscribe(async (response) => {
        if (response.error) {
          await this.ionToastService.presentToast(response.error, 'bottom');
          return;
        }

        await this.ionToastService.presentToast(response.message, 'bottom');
      });
  }

  private getTodayDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
  }

  submitForm() {
    console.log(this.fGroup.value);
  }
}
