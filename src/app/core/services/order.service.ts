import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  getOrders(page = 1, limit = 10): Observable<{ meta: any; data: Order[] }> {
    const params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    return this.http.get<{ meta: any; data: Order[] }>(this.baseUrl, { params });
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${id}`);
  }
}
