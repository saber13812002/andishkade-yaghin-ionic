import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController, } from '@ionic/angular';
import { AlertService } from '../services/alert.service';
import { ToastService } from '../services/toast.service';
import { ApiService } from '../services/api.service';
import { Alert } from '../models/alert';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.page.html',
  styleUrls: ['./bootstrap.page.scss'],
})
export class BootstrapPage implements OnInit {

  token;

  constructor(public navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertService: AlertService,
    private toastService: ToastService,
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.token = localStorage.getItem('token');

    if (this.token != null) {
      this.validateToken(this.token);
    }
    else {
      localStorage.clear();
      this.router.navigateByUrl('/login');
    }
  }

  async validateToken(jwt: string) {
    const loading = await this.loadingCtrl.create({
      message: ''
    });
    await loading.present();
    try {
      await this.apiService.me(this.token).subscribe(data => {
        console.log('data:', data);
        localStorage.setItem('user', JSON.stringify(data));
        this.router.navigateByUrl('/home');
      });
      await this.toastService.presentToast("Login successfull!");
    } catch (e) {
      // fixme when login page created (remove me)
      localStorage.clear();
      this.router.navigateByUrl('/login');
      console.log(e);
      //fixme these peace of code when interception implemented as auth guard
      await this.alertService.present(200);
    }
    await loading.dismiss();
  }


  async login(credential) {
    await this.apiService.login(credential).subscribe(data => {
      console.log(data);
    });
  }

}
