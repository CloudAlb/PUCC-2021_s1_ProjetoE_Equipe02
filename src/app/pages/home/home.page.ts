// TODO: Infinit Scroll não esta limitando

import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SessionManagerService } from 'src/app/services/session-manager.service';

import { HomeService } from 'src/app/services/home.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  publications = [];
  publicationsBkp = [];
  itensPage: any = [];
  private readonly offset: number = 5;
  private index: number = 0;

  private name = '';
  private username = '';
  private avatar_image = '';

  public searchText;

  constructor(public homeService: HomeService,
              public localStorageService: LocalStorageService,
              public alertController: AlertController,
              public sessionManagerService: SessionManagerService)
  {}

  ngOnInit() {
    this.loadPublications();
    const userInfo = this.localStorageService.getUserInfo();

    this.name = userInfo.name;
    this.username = userInfo.username;
    if (userInfo.avatar_image) this.avatar_image = userInfo.avatar_image;
    // this.verifyNewPubs();
  }

  loadPublications() {
    this.homeService.getPublications().subscribe((response) => {
      this.publications = response.data;
      this.itensPage = this.publications.slice(
        this.index,
        this.offset + this.index
      );
      this.index += this.offset;
      this.publicationsBkp = response.data;
    });
  }

  loadData(event) {
    setTimeout(() => {
      let news = this.publications.slice(this.index, this.offset + this.index);
      this.index += this.offset;

      for (let i = 0; i < news.length; i++) {
        this.itensPage.push(news[i]);
      }

      event.target.complete();

      if (this.itensPage.length == 100) {
        event.target.disabled = true;
      }
    }, 1200);
  }

  verifyNewPubs() {
    const source = interval(4000);
    source.subscribe(() => {
      this.loadPublications();
    });
  }

  filtraPubs(texto: any) {
    let val = texto.target.value;
    this.publications = this.publicationsBkp;

    if (val != null && val.trim() !== '' && val !== undefined) {
      this.publications = this.publications.filter((item) => {
        if (item.tournament.name && val) {
          return (
            item.tournament.name.toLowerCase().indexOf(val.toLowerCase()) > -1
          );
        }
      });
    }
  }
}
