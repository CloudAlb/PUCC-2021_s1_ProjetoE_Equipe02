import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { SessionManagerService } from './session-manager.service';
import { ItemInfo } from '../models/item-info';

export interface ItemResponse {
  message?: string,

  token?: {
    token: string;
  }

  error?: string;
}

interface ItemRequest {
  id_item: string;
  nome: string;
  tipo: string;
  asset: string;
  preco: number;
}

@Injectable({
  providedIn: 'root'
})
export class LojaService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private sessionManagerService: SessionManagerService) {
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.sessionManagerService.getToken(),
      });
    }

    public getItens(): Observable<ItemInfo> {
      return this.http.get<ItemInfo>(environment.baseUrl + '/item/', {
        headers: this.headers,
      });
    }

    // public postItem(body: ItemRequest): Observable<ItemResponse> {
    //   return this.http.post(environment.baseUrl + '/pubs/', body, {
    //     headers: this.headers,
    //   });
    // }
}
