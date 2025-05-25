import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CheckoutPayload } from '../models/checkout.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private baseUrl = `${environment.apiUrl}/checkout`;

  constructor(private http: HttpClient) {}

  processCheckout(payload: CheckoutPayload) {
    return this.http.post<{ message: string; data: any }>(this.baseUrl, payload);
  }
}
