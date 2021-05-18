import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { SessionManagerService } from './session-manager.service';
import { ItensInfo } from '../models/itens-inventario-info';

export interface InventarioResponse {
  message?: string;

  token?: {
    token: string;
  };

  error?: string;
}

interface InventarioRequest {
  id_item: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private sessionManagerService: SessionManagerService) {
      this.getHeaders();
    }

    getHeaders() {
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.sessionManagerService.getToken(),
      });
    }

    public getItensInventario(): Observable<ItensInfo> {
      this.getHeaders();
      return this.http.get<ItensInfo>(environment.baseUrl + '/inventario/find', {
        headers: this.headers,
      });
    }

    // public addItem(body: InventarioRequest): Observable<InventarioResponse> {
    //   this.getHeaders();
    //   let json = {id_item:`${body}`};
    //   return this.http.post(environment.baseUrl + '/inventario/', json, {
    //     headers: this.headers,
    //   });
    // }
}
