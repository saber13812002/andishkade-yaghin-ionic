import { ToastService } from './../services/toast.service';
import { AlertService } from './../services/alert.service';
import { Router } from '@angular/router';
import { ApiService } from './../services/api.service';
import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { SignInfo } from './../models/signinfo';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = "saber.tabatabaee1@gmail.com";
  password = "123456";

  sign_up_fields : SignInfo;

  constructor(
    private loadingCtrl: LoadingController,
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
  }

  async signIn() {
    console.log("clicked")

    const loading = await this.loadingCtrl.create({
      message: ''
    });
    await loading.present();
    try {
      let credential = { "usernameOrEmail": this.email, "password": this.password };
      await this.apiService.login(credential).subscribe(data => {
        console.log('data:', data);
        localStorage.setItem('accessToken', JSON.stringify(data));
        this.router.navigateByUrl('/bootstrap');
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


  /**
   * signup
   */
  public signup() {
    this.router.navigateByUrl('/register');
  }
}
