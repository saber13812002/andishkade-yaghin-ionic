import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertService } from '../services/alert.service';
import { ApiService } from '../services/api.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userName
  pollCount
  voteCount

  constructor(
    private loadingCtrl: LoadingController,
    private apiService: ApiService,
    private router: Router,
    private alertService: AlertService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getProfile();
  }



  async getProfile() {
    console.log("clickgetProfileed")

    const loading = await this.loadingCtrl.create({
      message: ''
    });
    await loading.present();
    try {
      await this.apiService.profile().subscribe(data => {
        console.log('data:', data);

        let profile: any = data;
        localStorage.setItem('profile', JSON.stringify(data));
        this.userName = profile.username;
        this.pollCount = profile.pollCount;
        this.voteCount = profile.voteCount;


      });
      await this.toastService.presentToast("your profile !");
    } catch (e) {
      console.log(e);
      await this.alertService.present(200);
    }
    await loading.dismiss();

  }
}
