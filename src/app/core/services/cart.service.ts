import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private _purchaseCompleted = new BehaviorSubject<boolean>(false);
  purchaseCompleted$ = this._purchaseCompleted.asObservable();

  completePurchase() {
    this._purchaseCompleted.next(true);
  }

  resetPurchaseFlag() {
    this._purchaseCompleted.next(false);
  }
}