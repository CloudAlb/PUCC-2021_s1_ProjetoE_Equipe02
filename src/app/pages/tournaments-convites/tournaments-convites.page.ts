import { Component, OnInit } from '@angular/core';
import { TournamentsService } from 'src/app/services/tournaments.service';

@Component({
  selector: 'app-tournaments-convites',
  templateUrl: './tournaments-convites.page.html',
  styleUrls: ['./tournaments-convites.page.scss'],
})
export class TournamentsConvitesPage implements OnInit {
  tournaments = [];

  constructor(private tournamentsService: TournamentsService) {}

  ngOnInit() {
    this.getInvites();
  }

  getInvites() {
    this.tournamentsService
      .getTournamentsUserInvites()
      .subscribe((response) => {
        this.tournaments = response.data;
      });
  }

  showAcceptInviteModal() {
    console.log('clickado');
  }
}
