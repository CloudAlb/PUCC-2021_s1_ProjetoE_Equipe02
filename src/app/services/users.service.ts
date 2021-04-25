import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface Response {
  data: {
    id_user: string;
    name: string;
    username: string;
    avatar_image: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<Response> {
    return this.http.get<Response>(environment.baseUrl + '/users/list');
  }
}
