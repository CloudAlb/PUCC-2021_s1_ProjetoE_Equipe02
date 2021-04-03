import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';

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

  constructor(private activatedRoute: ActivatedRoute) {
    for (let i = 0; i < 100; i++) {
      this.items.push(`Item ${i+1}`)
    }
    this.itemsPage = this.items.slice(this.index, this.offset+this.index);
    this.index += this.offset;
  }

  loadData(event) {
    setTimeout(() => {
      let news = this.items.slice(this.index, this.offset+this.index);
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

  ngOnInit() {
  }

}
