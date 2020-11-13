import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Alert } from '../models/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {


  constructor(
    public alertCtrl: AlertController,
    public alert: Alert
  ) { }


  async present(code) {
    this.getAlertByCode(code);
    const alert = await this.alertCtrl.create({
      message: this.alert.message,
      subHeader: this.alert.subHeader,
      buttons: ['OK']
    });
    await alert.present();
  }

  getAlertByCode(code) {
    switch (code) {
      case 401:
        this.alert.message = "token is invalid";
        this.alert.message = "please login!";
        break;
        case 200:
          this.alert.message = "token is valid";
          this.alert.message = "welcome";
          break;

      default:
        break;
    }
  }

}
