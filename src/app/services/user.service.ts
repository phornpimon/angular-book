import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiPath = "/auth";

  constructor(
    private apiService: ApiService
  ) { }

  register(formData: any): Observable<any> {
    return this.apiService.post(`${this.apiPath}/register`, formData)
  }

  // login(): Observable<any> {
  //   return this.apiService.post(`${this.apiPath}/login`)
  // }
}
