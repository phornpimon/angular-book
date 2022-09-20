import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiPath = "/book";

  constructor(
    private apiService: ApiService
  ) { }

  getAllBook(): Observable<any> {
    return this.apiService.get(`${this.apiPath}`)
  }
}
