import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  username;

  constructor(
    private router: Router,
    private navCtrl:NavController,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getUserInfo();
  }

  /**
   * getUserInfo
   */
  public getUserInfo() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.username = userInfo.username;
  }

  /**
   * logout
   */
  public logout() {
    this.router.navigateByUrl('/logout');
  }
}
