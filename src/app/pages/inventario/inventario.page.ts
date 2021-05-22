import { Component, OnInit } from '@angular/core';

import { InventarioService } from 'src/app/services/inventario.service';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { UsersService } from 'src/app/services/users.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SeuPerfilService } from 'src/app/services/seu-perfil.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  itens = [];
  id_user: any;
  backgroundPath;
  avatarPath;

  constructor(public inventarioService: InventarioService,
              public usersService: UsersService,
              private ionToastService: IonToastService,
              public localStorageService: LocalStorageService,
              public seuPerfilService: SeuPerfilService) { }

  ngOnInit() {
    this.id_user = this.localStorageService.getUserInfo();

    this.loadUserInfo();
    this.loadItensInventario();
  }

  loadUserInfo() {
    this.seuPerfilService
      .getUser(this.id_user.id_user)
      .subscribe((response) => {
        if (!response.data) return;

        if (response.data.avatar_image)
          this.avatarPath = response.data.avatar_image;
        if (response.data.background_image)
          this.backgroundPath = response.data.background_image;
      });
  }

  loadItensInventario() {
    this.inventarioService.getItensInventario().subscribe((response) => {
      this.itens = response.data;
      console.log(this.itens);
    });
  }

  usarItem(caminho, id_item, tipo){
    if (tipo == 'Avatar') {
      let item_ant = this.itens.find(elem => elem.item.tipo == tipo && elem.ativo == true);

      if (item_ant != undefined) {
        this.inventarioService.desativaItem(item_ant.item.id_item).subscribe(async (response) => {
            if (response.status) {
              await this.ionToastService.presentToast(response.status, 'bottom');
              return;
            }
        });

        this.inventarioService.ativaItem(id_item).subscribe(async (response) => {
          if (response.status) {
            await this.ionToastService.presentToast(response.status, 'bottom');
            return;
          }
        });
      }else{
        this.inventarioService.ativaItem(id_item).subscribe(async (response) => {
            if (response.status) {
              await this.ionToastService.presentToast(response.status, 'bottom');
              return;
            }
        });
      }
      this.usersService
          .atualizaAvatar(caminho)
          .subscribe(async (response) => {
            if (response.status) {
              await this.ionToastService.presentToast(response.status, 'bottom');
              return;
            }
          await this.ionToastService.presentToast(response.message, 'bottom');
        });
    }else{
      let item_ant = this.itens.find(elem => elem.item.tipo == tipo && elem.ativo == true);

      if (item_ant != undefined) {
        this.inventarioService.desativaItem(item_ant.item.id_item).subscribe(async (response) => {
            if (response.status) {
              await this.ionToastService.presentToast(response.status, 'bottom');
              return;
            }
        });

        this.inventarioService.ativaItem(id_item).subscribe(async (response) => {
          if (response.status) {
            await this.ionToastService.presentToast(response.status, 'bottom');
            return;
          }
        });
      }else{
        this.inventarioService.ativaItem(id_item).subscribe(async (response) => {
            if (response.status) {
              await this.ionToastService.presentToast(response.status, 'bottom');
              return;
            }
        });
      }
      this.usersService
        .atualizaBackground(caminho)
        .subscribe(async (response) => {
          if (response.status) {
            await this.ionToastService.presentToast(response.status, 'bottom');
            return;
          }
        await this.ionToastService.presentToast(response.message, 'bottom');
      });
    }
    this.loadItensInventario();
  }
}
