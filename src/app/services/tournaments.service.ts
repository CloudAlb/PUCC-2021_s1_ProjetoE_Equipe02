import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TournamentInfo } from '../models/tournament-info';
import { SessionManagerService } from './session-manager.service';

interface CreateTournamentRequest {
  name: string;
  game: string;
  description: string;
  number_participants: number;

  password?: string;
}

interface UpdateTournamentRequest {
  id: string;
  name: string;
  game: string;
  description: string;
}

interface UpdateTournamentResponse {
  message?: string;

  error?: string;
}

interface GetTournamentsByUser {
  data: [];
}

interface GetTournamentsInvites {
  data: [
    {
      tournament: {
        id_tournament: string;
        name: string;
        game: string;
        description: string;
        password: string;
      }
    }
  ];
}

interface UserParticipant {
  data?: [
    {
      id_user: string;
      name: string;
      username: string;
      avatar_image: string;
    }
  ];

  message?: string;
}

interface Columns {
  column1: string | null | undefined;
  column2: string | null | undefined;
  column3: string | null | undefined;
  column4: string | null | undefined;
}

interface TournamentColumnsResponse {
  data?: {
    column1: string | null | undefined;
    column2: string | null | undefined;
    column3: string | null | undefined;
    column4: string | null | undefined;

    tournament_initialized: boolean;
  };

  message?: string;
}

interface UpdateTournamentColumnsResponse {
  message?: string;

  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TournamentsService {
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

  // TODO, retirar o encapsulamento de todos os atributos e métodos
  getTournament(id: string): Observable<TournamentInfo> {
    return this.http.get<TournamentInfo>(
      environment.baseUrl + '/tournaments/id/' + id,
      {
        headers: this.headers,
      }
    );
  }

  postTournament(
    body: CreateTournamentRequest
  ): Observable<UpdateTournamentResponse> {
    return this.http.post<UpdateTournamentResponse>(
      environment.baseUrl + '/tournaments/',
      body,
      {
        headers: this.headers,
      }
    );
  }

  updateTournament(
    body: UpdateTournamentRequest
  ): Observable<UpdateTournamentResponse> {
    return this.http.patch<UpdateTournamentResponse>(
      environment.baseUrl + '/tournaments/' + body.id,
      body,
      {
        headers: this.headers,
      }
    );
  }

  getUserTournaments(): Observable<GetTournamentsByUser> {
    return this.http.get<GetTournamentsByUser>(environment.baseUrl + '/tournaments/user', { headers: this.headers });
  }

  getTournamentsUserIsParticipating(): Observable<GetTournamentsInvites> {
    return this.http.get<GetTournamentsInvites>(
      environment.baseUrl + '/tournaments/manage/user',
      {
        headers: this.headers,
      }
    );
  }

  inviteUserToTournament(
    id_user: string,
    id_tournament: string
  ): Observable<UpdateTournamentResponse> {
    return this.http.post<UpdateTournamentResponse>(
      environment.baseUrl + '/tournaments/manage/invite/' + id_user,
      {
        id_tournament,
      },
      {
        headers: this.headers,
      }
    );
  }

  getTournamentParticipants(
    id_tournament: string
  ): Observable<UserParticipant> {
    return this.http.get<UserParticipant>(
      environment.baseUrl +
        '/tournaments/manage/users/accepted/' +
        id_tournament,
      {
        headers: this.headers,
      }
    );
  }

  getTournamentsUserInvites(): Observable<GetTournamentsInvites> {
    return this.http.get<GetTournamentsInvites>(
      environment.baseUrl + '/tournaments/manage/user/pending/',
      {
        headers: this.headers,
      }
    );
  }

  getTournamentColumns(
    id_tournament: string
  ): Observable<TournamentColumnsResponse> {
    return this.http.get<TournamentColumnsResponse>(
      environment.baseUrl + '/tournaments/columns/' + id_tournament,
      {
        headers: this.headers,
      }
    );
  }

  updateTournamentColumns(
    id_tournament: string,
    { column1, column2, column3, column4 }: Columns
  ): Observable<UpdateTournamentColumnsResponse> {
    return this.http.patch(
      environment.baseUrl + '/tournaments/columns/' + id_tournament,
      {
        column1,
        column2,
        column3,
        column4,
      },
      {
        headers: this.headers,
      }
    );
  }

  updateTournamentFlagInitializedTournament(
    id_tournament: string,
    flag: boolean
  ): Observable<UpdateTournamentColumnsResponse> {
    return this.http.patch(
      environment.baseUrl + '/tournaments/columns/flag/' + id_tournament,
      {
        flag,
      },
      {
        headers: this.headers,
      }
    );
  }
}
