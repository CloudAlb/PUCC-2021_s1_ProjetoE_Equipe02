import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataFilterService } from 'src/app/services/data-filter.service';
import { IonAlertService } from 'src/app/services/ion-alert.service';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { TournamentsService } from 'src/app/services/tournaments.service';
import { UsersService } from 'src/app/services/users.service';

interface User {
  id_user: string;
  name: string;
  username: string;
  avatar_image: string;
}

// TODO, fazer o ícone de "já convidado"
@Component({
  selector: 'app-invite-participants',
  templateUrl: './invite-participants.page.html',
  styleUrls: ['./invite-participants.page.scss'],
})
export class InviteParticipantsPage implements OnInit {
  @Input() id_tournament: string;

  users: User[] = [];
  filteredUsers: User[] = [];

  searchTerm: string = '';

  constructor(
    private modalController: ModalController,
    private usersService: UsersService,
    private ionAlertService: IonAlertService,
    private ionToastService: IonToastService,
    private tournamentsService: TournamentsService,
    private dataFilterService: DataFilterService
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  getSearchData() {
    this.filteredUsers = this.dataFilterService.filterItems(
      this.users,
      this.searchTerm
    );
  }

  inviteUser(id_user: string, name: string) {
    this.ionAlertService.presentAlertMultipleButtons(
      'Deseja convidar ' + name + ' para o seu torneio?',
      '',
      [
        {
          text: 'Não',
        },
        {
          text: 'Sim',
          handler: () => {
            this.tournamentsService
              .inviteUserToTournament(id_user, this.id_tournament)
              .subscribe((response) => {
                if (response.status == 'error') {
                  this.ionToastService.presentToast(response.message, 'bottom');
                  return;
                }

                this.ionToastService.presentToast(
                  'Convite feito com sucesso.',
                  'bottom'
                );
                return;
              });
          },
        },
      ]
    );
  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe((response) => {
      this.users = response.data;
      this.filteredUsers = response.data;
    });
  }
}
