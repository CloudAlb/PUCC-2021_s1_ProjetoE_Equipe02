import { Component, OnInit } from '@angular/core';

import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
})
export class InventarioPage implements OnInit {

  itens = [];

  constructor(public inventarioService: InventarioService) { }

  ngOnInit() {
    this.loadItensInventario();
  }

  loadItensInventario() {
    this.inventarioService.getItensInventario().subscribe((response) => {
      this.itens = response.data;
      console.log(this.itens);
    });
  }
}
