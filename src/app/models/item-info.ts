export interface ItemInfo {
  data?: [{
      id_item: string;
      nome: string;
      tipo: string;
      asset: string;
      preco: number;
  }];

  message?: string;
}
