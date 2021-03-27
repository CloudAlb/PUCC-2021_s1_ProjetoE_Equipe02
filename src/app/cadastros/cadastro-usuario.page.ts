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

  public maxDate = new Date

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