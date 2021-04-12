import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { localUserData } from '../models/local-user-data';
import { LoginResponse } from '../models/login-response';
import { LocalStorageService } from './local-storage.service';
import { SeuPerfilService } from './seu-perfil.service';

interface Request {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor(private http: HttpClient,
    private seuPerfilService: SeuPerfilService,
    private localStorageService: LocalStorageService) { }

  public postLogin(body: Request): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.baseUrl + "/sessions", body);
  }

  public setUserData() {
    // TODO, tratativa de erro?
    this.seuPerfilService.getUser().subscribe((response) => {
      this.localStorageService.setUserInfo({ name: response.data.name, email: response.data.email, avatar_image: response.data.avatarImage });
    })
  };

  public getUserData(): localUserData {
    // TODO, tratativa de erro?
    return this.localStorageService.getUserInfo();
  }

}
