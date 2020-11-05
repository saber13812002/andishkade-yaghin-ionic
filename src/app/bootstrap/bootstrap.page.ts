import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.page.html',
  styleUrls: ['./bootstrap.page.scss'],
})
export class BootstrapPage implements OnInit {

  token;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,
    public apiService:ApiService,
    ) { }

  ngOnInit() {

    this.token = localStorage.getItem('token');

    if (this.token != null) {

    }
    this.validateToken(this.token);
  }

  async validateToken(jwt: string) {
    await this.apiService.getList().subscribe(data => {
      console.log(data);
    });
  }

}
