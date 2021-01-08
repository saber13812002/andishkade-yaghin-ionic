import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ENVService {

  constructor() { }

  public login() {
    return environment.api.base_url + environment.api.prefix + environment.api.login;
  }

  public signup() {
    return environment.api.base_url + environment.api.prefix + environment.api.signup;
  }

  public me() {
    return environment.api.base_url + environment.api.prefix + environment.api.me;
  }

  public profile(){

    let userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return environment.api.base_url + environment.api.prefix + environment.api.users + userInfo.username;

  }

  public polls(){
    return environment.api.base_url + environment.api.prefix + environment.api.polls;
  }
}
