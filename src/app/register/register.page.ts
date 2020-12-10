import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SignInfo } from '../models/signinfo';
import { AlertService } from '../services/alert.service';
import { ApiService } from '../services/api.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email = "saber.tabatabaee1@gmail.com";
  password = "123456";
  name
  username

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private apiService: ApiService,
    private alertService: AlertService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
  }
  
  /**
   * login
   */
  public login() {
    this.router.navigateByUrl('/login');
  }


  async signUp() {
    console.log("clicked signUp")

    const loading = await this.loadingCtrl.create({
      message: ''
    });
    await loading.present();
    try {
      let credential = { "email": this.email, "name": this.name, "username": this.username, "password": this.password };

      await this.apiService.signUp(credential).subscribe(data => {
        console.log('data:', data);
        localStorage.setItem('signup_result', JSON.stringify(data));
        this.router.navigateByUrl('/bootstrap');
      });
      await this.toastService.presentToast("signUp successfull!");
    } catch (e) {
      localStorage.clear();
      this.router.navigateByUrl('/login');
      console.log(e);
      await this.alertService.present(200);
    }
    await loading.dismiss();

  }
}
