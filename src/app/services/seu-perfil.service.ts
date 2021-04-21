import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { UserSocialResponse } from '../models/user-social-response';
import { EditUserInfo } from '../models/edit-user-info';
import { MessageData } from '../models/message-data';
import { EditUserSocials } from '../models/edit-user-socials';
import { EditUserPassword } from '../models/edit-user-password';
import { UserSocialRequest } from '../models/user-social-request';
import { SessionManagerService } from './session-manager.service';
import { UserInfo } from '../models/user-info';

@Injectable({
  providedIn: 'root',
})
export class SeuPerfilService {
  private user_id: string;
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private sessionManagerService: SessionManagerService
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.sessionManagerService.getToken(),
    });
  }

  public getUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>(environment.baseUrl + '/users/', {
      headers: this.headers,
    });
  }

  public getUserSocial(): Observable<UserSocialResponse> {
    return this.http.get<UserSocialResponse>(
      environment.baseUrl + '/users/social/',
      {
        headers: this.headers,
      }
    );
  }

  public editUser(body: EditUserInfo): Observable<MessageData> {
    return this.http.patch<MessageData>(
      environment.baseUrl + '/users/edit/',
      body,
      {
        headers: this.headers,
      }
    );
  }

  public editUserSocialInfo(body: UserSocialRequest): Observable<MessageData> {
    return this.http.patch<MessageData>(
      environment.baseUrl + '/users/edit/social/',
      body,
      {
        headers: this.headers,
      }
    );
  }

  public editPassword(body: EditUserPassword): Observable<MessageData> {
    return this.http.patch<MessageData>(
      environment.baseUrl + '/users/edit/password/',
      body,
      {
        headers: this.headers,
      }
    );
  }
}
