import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Alert } from '../models/alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {


  constructor(
    public alertCtrl: AlertController,
  ) {
  }


  async present(alertMessage) {
    const alert = await this.alertCtrl.create({
      message: alertMessage.message,
      subHeader: alertMessage.subHeader,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentByCode(code) {
    let alert: Alert;
    switch (code) {
      case 401:
        alert.message = "token is invalid";
        alert.message = "please login!";
        break;
        case 200:
          alert.message = "token is valid";
          alert.message = "welcome";
          break;

      default:
        break;
    }
    this.present(alert);
  }
}
