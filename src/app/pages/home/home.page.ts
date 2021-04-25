import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, IonInfiniteScroll } from '@ionic/angular';
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

  public nameCamp = "Campeonato teste"
  public jogoCamp = "League of legends"

  private name = "";
  private username = "";
  private avatar_image = "";

  constructor(private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService,
    public alertController: AlertController) {
    for (let i = 0; i < 100; i++) {
      this.items.push(`Item ${i + 1}`)
    }
    this.itemsPage = this.items.slice(this.index, this.offset + this.index);
    this.index += this.offset;
  }

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Meus campeonatos',
      inputs: [
        {
          name: 'radio1',
          type: 'radio',
          label: 'Camp 1',
          value: 'value1',
          handler: () => {
            console.log('Radio 1 selected');
          },
          checked: true
        },
        {
          name: 'radio2',
          type: 'radio',
          label: 'Camp 2',
          value: 'value2',
          handler: () => {
            console.log('Radio 2 selected');
          }
        },
        {
          name: 'radio3',
          type: 'radio',
          label: 'Camp 3',
          value: 'value3',
          handler: () => {
            console.log('Radio 3 selected');
          }
        },
        {
          name: 'radio4',
          type: 'radio',
          label: 'Camp 4',
          value: 'value4',
          handler: () => {
            console.log('Radio 4 selected');
          }
        },
        {
          name: 'radio5',
          type: 'radio',
          label: 'Camp 5',
          value: 'value5',
          handler: () => {
            console.log('Radio 5 selected');
          }
        },
        {
          name: 'radio6',
          type: 'radio',
          label: 'Camp 6',
          value: 'value6',
          handler: () => {
            console.log('Radio 6 selected');
          }
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    const userInfo = this.localStorageService.getUserInfo();
    this.name = userInfo.name;
    this.username = userInfo.username;
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
