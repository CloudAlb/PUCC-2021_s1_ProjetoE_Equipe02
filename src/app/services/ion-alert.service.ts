import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

interface AlertButton {
  text: string;
  role?: string;
  cssClass?: string | string[];
  handler?: (value: any) => boolean | void | {
    [key: string]: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class IonAlertService {

  constructor(private alertController: AlertController) { }

  public async presentAlertMultipleButtons(header: string, message: string, buttons: Array<string> | Array<AlertButton>, subheader?: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      subHeader: subheader,
      message: message,
      buttons: buttons
    });

    await alert.present();
  }
}
