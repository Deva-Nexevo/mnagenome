import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  curr: any = localStorage.getItem('currentUser') ?? '0';
  auth_token: string = JSON.parse(this.curr).token;
  constructor(private http: HttpClient) {}

  getToken() {
    let curr = localStorage.getItem('currentUser') ?? '0';
    this.auth_token = JSON.parse(curr).token;
  }

  getRequestData(param: any) {
    this.getToken();
    const headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth_token}`,
    });
    const httpOptions = {
      headers: headers_object,
    };
    return this.http.post<any>(
      `${environment.apiUrl}/frame-details`,
      param,
      httpOptions
    );
  }
}
