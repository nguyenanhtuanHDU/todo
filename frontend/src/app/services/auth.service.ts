import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BaseService } from './base.service';
import { IResponse } from '../shared/models/response.model';
import { IUser } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    super();
  }

  getToken(): string {
    return this.cookieService.get('token')
  }

  setToken(token: string) {
    this.cookieService.set('token', token)
  }

  removeToken() {
    this.cookieService.set('token', '')
  }

  login(command: Partial<IUser>) {
    return this.http.post<IResponse<IUser>>(this.createUrl(['auth', 'login']), command)
  }
}
