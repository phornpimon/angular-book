import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginDetail } from '../shared/classes/login-detail';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiPath = "/auth";

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  register(formData: any): Observable<any> {
    return this.apiService.post(`${this.apiPath}/register`, formData)
  }

  login(loginDetail: LoginDetail): Observable<any> {
    return this.apiService.post(`${this.apiPath}/login`, loginDetail)
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate([''])
  }

  isLoggedIn() {
    let token = localStorage.getItem('token')

    if (token) {
      return true
    } else {
      return false
    }
  }
}
