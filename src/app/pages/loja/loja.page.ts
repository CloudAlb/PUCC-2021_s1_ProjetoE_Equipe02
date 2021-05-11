import { Component, OnInit } from '@angular/core';

import { UserInfo } from 'src/app/models/user-info';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { SeuPerfilService } from 'src/app/services/seu-perfil.service';
import { LojaService } from 'src/app/services/loja.service';
import { IonAlertService } from 'src/app/services/ion-alert.service';
import { IonToastService } from 'src/app/services/ion-toast.service';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.page.html',
  styleUrls: ['./loja.page.scss'],
})
export class LojaPage implements OnInit {
  public avatarPath = "assets/icons/defaultIcon.svg";

  itens = [];
  user: UserInfo = {};
  id_user: any;
  coins = '0';

  constructor(public seuPerfilService: SeuPerfilService,
              public lojaService: LojaService,
              public localStorageService: LocalStorageService,
              private ionAlertService: IonAlertService,
              private ionToastService: IonToastService) { }

  ngOnInit() {

    this.id_user = this.localStorageService.getUserInfo();

    this.loadUserInfo();
    this.loadItens();
  }

  loadItens() {
    this.lojaService.getItens().subscribe((response) => {
      this.itens = response.data;
    });
  }

  loadUserInfo() {
    this.seuPerfilService
      .getUser(this.id_user.id_user)
      .subscribe((response) => {
        if (!response.data) return;

        this.user = response;

        if (response.data.coins)
          this.coins = response.data.coins;
      });
  }

  compraItem(id_item,valor) {
    console.log(id_item);
    this.ionAlertService.presentAlertMultipleButtons(
      'Deseja comprar esse item?',
      '',
      [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.lojaService
              .addItem(id_item)
              .subscribe(async (response) => {
                if (response.error) {
                  await this.ionToastService.presentToast(response.error, 'bottom');
                  return;
                }


                await this.ionToastService.presentToast(
                  'Item comprado com sucesso.',
                  'bottom'
                );
                return;
              });
          },
        },
      ]
    );
  }
}
