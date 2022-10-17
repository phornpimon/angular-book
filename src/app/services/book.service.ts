import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public listbook = []
  private apiPath = "/book";

  constructor(
    private apiService: ApiService
  ) { }

  getListBook(): any {
    return this.listbook
  }

  getAllBook(offSet: number, pageSize: number): Observable<any> {
    return this.apiService.get(`${this.apiPath}/offset=${offSet}/pageSize=${pageSize}`)
  }

  getBookCategory(category: any, offSet: number, pageSize: number): Observable<any> {
    return this.apiService.get(`${this.apiPath}/category/offset=${offSet}/pageSize=${pageSize}?bookCategory=${category}`)
  }

  getBookByName(bookname: any, offSet: number, pageSize: number): Observable<any> {
    return this.apiService.get(`${this.apiPath}/search/offset=${offSet}/pageSize=${pageSize}?bookname=${bookname}`)
  }

  getBookById(id: number): Observable<any> {
    return this.apiService.get(`${this.apiPath}/${id}`)
  }

  getBookByField(field: any, offSet: number, pageSize: number): Observable<any> {
    return this.apiService.get(`${this.apiPath}/sort/${field}/offset=${offSet}/pageSize=${pageSize}`)
  }
}
