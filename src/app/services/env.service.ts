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

  public me() {
    return environment.api.base_url + environment.api.prefix + environment.api.me;
  }
}
