import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonToastService } from 'src/app/services/ion-toast.service';
import { TournamentsService } from 'src/app/services/tournaments.service';

@Component({
  selector: 'app-tournaments-criar',
  templateUrl: './tournaments-criar.page.html',
  styleUrls: ['./tournaments-criar.page.scss'],
})
export class TournamentsCriarPage implements OnInit {
  public fGroup: FormGroup;

  constructor(
    private tournamentService: TournamentsService,
    private ionToastService: IonToastService,
    private router: Router,
    private route: ActivatedRoute,
    private fBuilder: FormBuilder
  ) {
    this.fGroup = this.fBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      game: [null, Validators.compose([Validators.required])],
      num_participants: new FormControl(
        { value: '4', disabled: true },
        Validators.required
      ),
      description: [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {}

  async onSubmit() {
    this.tournamentService
      .postTournament({
        name: this.fGroup.get('name').value,
        game: this.fGroup.get('game').value,
        number_participants: 4,
        description: this.fGroup.get('description').value,
      })
      .subscribe(async (response) => {
        if (response.message) {
          this.ionToastService.presentToast(response.error, 'middle');
        }

        await this.ionToastService.presentToast(response.message, 'middle');

        this.router
          .navigate(['/tournaments-seus'], { relativeTo: this.route.parent })
          .then(() => {});
      });
  }
}
