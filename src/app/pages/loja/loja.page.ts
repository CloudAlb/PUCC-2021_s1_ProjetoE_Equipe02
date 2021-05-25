import { Component, OnInit } from '@angular/core';

import { UserInfo } from 'src/app/models/user-info';
import { LocalStorageService } from 'src/app/services/local-storage.service';

import { SeuPerfilService } from 'src/app/services/seu-perfil.service';
import { LojaService } from 'src/app/services/loja.service';
import { UsersService } from 'src/app/services/users.service';
import { IonAlertService } from 'src/app/services/ion-alert.service';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.page.html',
  styleUrls: ['./loja.page.scss'],
})

export class LojaPage implements OnInit {
  public avatarPath = "assets/icons/defaultIcon.svg";

  itens = [];
  itens_user = [];
  user: any;
  id_user: any;
  coins = '0';

  constructor(public seuPerfilService: SeuPerfilService,
              public lojaService: LojaService,
              public usersService: UsersService,
              public localStorageService: LocalStorageService,
              private ionAlertService: IonAlertService,
              private ionToastService: IonToastService,
              public inventarioService: InventarioService) { }

  ngOnInit() {

    this.id_user = this.localStorageService.getUserInfo();

    this.loadItensInventario();
    this.loadUserInfo();
    this.loadItens();
  }

  loadItens() {
    this.lojaService.getItens().subscribe((response) => {
      this.itens = response.data;
      for (let i = 0; i < this.itens.length; i++) {
        if(this.itens_user.findIndex(x => x.item.id_item == this.itens[i].id_item)!= -1){
          this.itens[i].comprado = true;
        }else{
          this.itens[i].comprado = false;
        }
      }
      console.log(this.itens);
    });
  }

  loadItensInventario() {
    this.inventarioService.getItensInventario().subscribe((response) => {
      this.itens_user = response.data;
      console.log(this.itens_user);
    });
  }

  loadUserInfo() {
    this.seuPerfilService
      .getUser(this.id_user.id_user)
      .subscribe((response) => {
        if (!response.data) return;

        this.user = response.data.id_user;

        if (response.data.coins)
          this.coins = response.data.coins;
      });
  }

  compraItem(id_item,valor) {
    console.log(this.id_user);
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

            if(this.coins < valor){
               this.ionToastService.presentToast(
                'Não há saldo suficiente.',
                'bottom'
              );
              return;
            };

            this.lojaService
              .addItem(id_item)
              .subscribe(async (response) => {
                if (response.error) {
                  await this.ionToastService.presentToast(response.error, 'bottom');
                  return;
                }

                this.usersService
                .removeCoins(this.user, valor)
                .subscribe((response) => {
                  if (response.status == 'error') {
                    return;
                  }
                });

                this.loadUserInfo();
                await this.ionToastService.presentToast(
                  'Item comprado com sucesso.',
                  'bottom'
                );
                return;
              });
          }
        }
      ]
    );
  }

}

