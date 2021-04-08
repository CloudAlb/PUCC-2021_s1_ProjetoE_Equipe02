import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { UserInfo } from 'src/app/models/DTO/user-info';

import { environment } from 'src/environments/environment';
import { UserSocialResponse } from '../models/DTO/user-social-response';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { EditUserInfo } from '../models/DTO/edit-user-info';
import { MessageData } from '../models/DTO/message-data';
import { EditUserSocials } from '../models/DTO/edit-user-socials';
import { EditUserPassword } from '../models/DTO/edit-user-password';
import { UserSocialRequest } from '../models/DTO/user-social-request';

@Injectable({
  providedIn: 'root'
})
export class SeuPerfilService {

  // TODO, passar o id do usuário para cá a partir do JWT
  // mas sem JWT, definir no construtor (depois apagar)
  private user_id: string;

  constructor(private http: HttpClient) {
    this.user_id = "da15b210-5114-4e3f-98aa-60cf5eee2267";
  }

  public getUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>(environment.baseUrl + "/users/" + this.user_id);
  }

  public getUserSocial(): Observable<UserSocialResponse> {
    return this.http.get<UserSocialResponse>(environment.baseUrl + "/users/social/" + this.user_id);
  }

  public editUser(body: EditUserInfo): Observable<MessageData> {
    return this.http.patch<MessageData>(environment.baseUrl + "/users/edit/" + this.user_id, body);
  }

  public editUserSocialInfo(body: UserSocialRequest): Observable<MessageData> {
    return this.http.patch<MessageData>(environment.baseUrl + "/users/edit/social/" + this.user_id, body);
  }

  public editPassword(body: EditUserPassword): Observable<MessageData> {
    return this.http.patch<MessageData>(environment.baseUrl + "/users/edit/password/" + this.user_id, body);
  }
}
