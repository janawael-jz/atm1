import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/api/auth';

  register(userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + '/register',
      userData
    );
  }

  login(loginData: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post<any>(
      this.baseUrl + '/login',
      loginData
    );
  }
}