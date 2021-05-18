export interface ItensInfo {
  data?: [{
      ativo: boolean;
      item:{
        nome: string;
        tipo: string;
        asset: string;
      };
  }];

  message?: string;
}
