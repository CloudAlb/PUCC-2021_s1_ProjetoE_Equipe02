import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit {
  public user = {
    nome:'',
    usuario:'',
    email:'',
    password:'',
    data_nascimento:''
  };

<<<<<<< HEAD:src/app/cadastros/cadastro-usuario.page.ts
=======
  public maxDate = new Date

  /*
  public today = new Date();
  public dd = String(this.today.getDate()).padStart(2, '0');
  public mm = String(this.today.getMonth() + 1).padStart(2, '0');
  public yyyy = this.today.getFullYear();

  public todayFormattedDate = this.dd + '/' + this.mm + '/' + this.yyyy;
  */

>>>>>>> b4955d4f6f66bca5563c0042c63c7ab4ed012734:src/app/pages/cadastros/cadastro-usuario.page.ts
  public fGroup: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private fBuilder: FormBuilder) {
    this.fGroup = this.fBuilder.group({
      'nome': [null, Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])],
      'usuario': [null, Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10)
      ])],
      'email': [null, Validators.compose([
        Validators.required,
        Validators.pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)

      ])],
      'senha': [null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      'data_nascimento': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  ngOnInit() {
  //this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  // Serve para setar os dados no formulário
  // this.fGroup.get('nome').setValue()
  }

  submitForm(){
    console.log(this.fGroup.value)
  }
}
