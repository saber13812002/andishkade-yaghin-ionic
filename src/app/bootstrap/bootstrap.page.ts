import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController, } from '@ionic/angular';
import { AlertService } from '../services/alert.service';
import { ToastService } from '../services/toast.service';
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
    public alertService: AlertService,
    public toastService: ToastService,
    public apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.token = localStorage.getItem('token');

    if (this.token != null) {

    }
    this.validateToken(this.token);
  }

  async validateToken(jwt: string) {
    try {
      await this.apiService.me("eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0IiwiaWF0IjoxNjA1MjU5NjEwLCJleHAiOjE2MDU4NjQ0MTB9.DgUJ5pg7AZZfw4aZXqrCxuBQlY-covLnG3XaFuOdcHVUDrqzLXgIM39UzSislzjs7w3Q3UNUWPT66rGNwQjquw").subscribe(data => {
        console.log('data:', data);
        localStorage.setItem('user', JSON.stringify(data));
      });
      await this.toastService.presentToast("Login successfull!");
      this.router.navigateByUrl('/home');
      
      // await this.alertService.present(200);
    } catch (e) {
      // fixme when login page created (remove me)
      this.router.navigateByUrl('/login');
      console.log(e);
      await this.alertService.present(e.code);
    }
  }

  async login(credential) {
    await this.apiService.login(credential).subscribe(data => {
      console.log(data);
    });
  }

}
