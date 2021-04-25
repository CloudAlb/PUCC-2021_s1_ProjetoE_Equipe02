import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentsSeusPageRoutingModule } from './tournaments-seus-routing.module';

import { TournamentsSeusPage } from './tournaments-seus.page';
import { CardTournamentComponent } from 'src/app/components/card-tournament/card-tournament.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentsSeusPageRoutingModule,
  ],
  declarations: [TournamentsSeusPage, CardTournamentComponent]
})
export class TournamentsSeusPageModule {}
