import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiPath = "/profile"

  constructor(
    private apiservice: ApiService,
    private router: Router
  ) { }

  getProfile(username: any, token: any): Observable<any> {
    const headers = new HttpHeaders().append(
      'Authorization', `Bearer ${token}`
    )
    return this.apiservice.get(`${this.apiPath}/?username=${username}`, headers)
  }
}
