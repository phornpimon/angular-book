import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { BASE_API, BASE_PATH_API } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  get(path: string): Observable<any> {
    const url = `${BASE_API}${path}`
    return this.httpClient.get<any>(url)
  }

  post(path: string, data: any): Observable<any> {
    const url = `${BASE_API}${path}`
    return this.httpClient.post<any>(url, data)
  }

}
