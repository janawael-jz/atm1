import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private http = inject(HttpClient);

  getMenuItems() {
    return this.http.get<any>('http://localhost:3000/api/menu-items');
  }
}