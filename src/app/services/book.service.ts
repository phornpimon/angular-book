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

  getAllBook(offSet: number, pageSize: number): Observable<any> {
    return this.apiService.get(`${this.apiPath}/offset=${offSet}/pageSize=${pageSize}`)
  }

  getBookCategory(category: any, offSet: number, pageSize: number): Observable<any> {
    return this.apiService.get(`${this.apiPath}/category/offset=${offSet}/pageSize=${pageSize}?bookCategory=${category}`)
  }

  getBookByName(bookname: any): Observable<any> {
    return this.apiService.get(`${this.apiPath}/search?bookname=${bookname}`)
  }
}
