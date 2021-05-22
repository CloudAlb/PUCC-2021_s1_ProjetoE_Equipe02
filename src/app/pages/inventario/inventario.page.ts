import { Component, OnInit } from '@angular/core';

import { InventarioService } from 'src/app/services/inventario.service';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  itens = [];

  constructor(public inventarioService: InventarioService,
              public usersService: UsersService,
              private ionToastService: IonToastService) { }

  ngOnInit() {
    this.loadItensInventario();
  }

  loadItensInventario() {
    this.inventarioService.getItensInventario().subscribe((response) => {
      this.itens = response.data;
      console.log(this.itens);
    });
  }

  usarItem(caminho){

    let verf = caminho.split('/');

    if (verf[1] == 'avatares') {
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
  }
}
