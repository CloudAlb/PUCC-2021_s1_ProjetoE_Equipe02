import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  items: any = [];
  itemsPage: any = [];
  private readonly offset: number = 9;
  private index: number = 0;

  private name = "";
  private email = "";
  private avatar_image = "";

  constructor(private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService) {
    for (let i = 0; i < 100; i++) {
      this.items.push(`Item ${i + 1}`)
    }
    this.itemsPage = this.items.slice(this.index, this.offset + this.index);
    this.index += this.offset;
  }

  ngOnInit() {
    const userInfo = this.localStorageService.getUserInfo();
    this.name = userInfo.name;
    this.email = userInfo.email;
    if (userInfo.avatar_image) this.avatar_image = userInfo.avatar_image;
  }

  loadData(event) {
    setTimeout(() => {
      let news = this.items.slice(this.index, this.offset + this.index);
      this.index += this.offset;

      for (let i = 0; i < news.length; i++) {
        this.itemsPage.push(news[i]);
      }

      event.target.complete();

      if (this.itemsPage.length == 100) {
        event.target.disabled = true;
      }
    }, 1200);
  }
}
