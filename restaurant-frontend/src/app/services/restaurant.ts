import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class Restaurant {

private http = inject(HttpClient);

private baseUrl = 'http://localhost:3000/api';

getMenuItems(): Observable<any> {
return this.http.get<any>(
`${this.baseUrl}/menu-items`
);
}

getOrders(): Observable<any> {
return this.http.get<any>(
`${this.baseUrl}/orders`
);
}

createOrder(orderData: any): Observable<any> {
return this.http.post<any>(
`${this.baseUrl}/orders`,
orderData
);
}

payPerson(paymentData: any): Observable<any> {
return this.http.post<any>(
`${this.baseUrl}/payments`,
paymentData
);
}

addMenuItem(menuItem: any): Observable<any> {
return this.http.post<any>(
`${this.baseUrl}/menu-items`,
menuItem
);
}

updateMenuItem(id: string, menuItem: any): Observable<any> {
return this.http.patch<any>(
`${this.baseUrl}/menu-items/${id}`,
menuItem
);
}

deleteMenuItem(id: string): Observable<any> {
return this.http.delete<any>(
`${this.baseUrl}/menu-items/${id}`
);
}
}
