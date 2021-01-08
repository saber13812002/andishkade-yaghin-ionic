import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertService } from '../services/alert.service';
import { ApiService } from '../services/api.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-polls',
  templateUrl: './polls.page.html',
  styleUrls: ['./polls.page.scss'],
})
export class PollsPage implements OnInit {

  polls:any

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
    this.getPolls();
  }


  async getPolls() {
    console.log("click getPolls")

    const loading = await this.loadingCtrl.create({
      message: ''
    });
    await loading.present();
    try {
      await this.apiService.polls().subscribe(data => {
        console.log('data:', data);

        let polls: any = data;
        this.polls = polls.content;
      });
      await this.toastService.presentToast("your polls !");
    } catch (e) {
      console.log(e);
      await this.alertService.present(200);
    }
    await loading.dismiss();

  }
}
