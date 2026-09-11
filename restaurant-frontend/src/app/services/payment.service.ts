import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:3000/api/payments';

  payPerson(paymentData: {
    orderId: string;
    person: number;
  }): Observable<any> {

    return this.http.post<any>(
      this.baseUrl,
      paymentData
    );
  }

  getPayments(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}