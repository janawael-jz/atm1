import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {

  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/api/menu-items';

  getMenuItems(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getMenuItem(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addMenuItem(item: MenuItem): Observable<any> {
    return this.http.post<any>(
      this.baseUrl,
      item
    );
  }

  updateMenuItem(
    id: string,
    item: Partial<MenuItem>
  ): Observable<any> {

    return this.http.patch<any>(
      `${this.baseUrl}/${id}`,
      item
    );
  }

  deleteMenuItem(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.baseUrl}/${id}`
    );
  }
}