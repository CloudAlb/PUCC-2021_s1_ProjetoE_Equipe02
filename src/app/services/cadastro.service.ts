import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CadastroRequest } from '../models/cadastro-request';
import { CadastroResponse } from '../models/cadastro-response';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  private headers = '';

  constructor(private http: HttpClient) {}

  postCadastro(body: CadastroRequest): Observable<CadastroResponse> {
    return this.http.post(environment.baseUrl + '/users', body);
  }
}
