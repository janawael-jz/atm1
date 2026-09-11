import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/api/orders';

  getOrders(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getOrder(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createOrder(order: Order): Observable<any> {
    return this.http.post<any>(
      this.baseUrl,
      order
    );
  }

  updateOrder(
    id: string,
    order: Partial<Order>
  ): Observable<any> {
    return this.http.patch<any>(
      `${this.baseUrl}/${id}`,
      order
    );
  }
}