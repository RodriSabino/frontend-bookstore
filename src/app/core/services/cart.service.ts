import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../models/book.model';

export interface CartItem {
  book: Book;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();
  private _purchaseCompleted = new BehaviorSubject<boolean>(false);
  purchaseCompleted$ = this._purchaseCompleted.asObservable();

  addToCart(book: Book): void {
    const existing = this.cartItems.find(item => item.book.id === book.id);

    if (existing) {
      if (existing.quantity < book.stock) {
        existing.quantity++;
      }
    } else {
      this.cartItems.push({ book, quantity: 1 });
    }

    this.cartSubject.next([...this.cartItems]);
  }

  updateQuantity(bookId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.book.id === bookId);
    if (item) {
      item.quantity = Math.min(quantity, item.book.stock);
      if (item.quantity <= 0) {
        this.removeFromCart(bookId);
      }
    }
    this.cartSubject.next([...this.cartItems]);
  }
  removeFromCart(bookId: number): void {
    this.cartItems = this.cartItems.filter(item => item.book.id !== bookId);
    this.cartSubject.next([...this.cartItems]);
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartSubject.next([]);
  }

  getItems(): CartItem[] {
    return [...this.cartItems];
  }
  getCart(): CartItem[] {
    return [...this.cartItems]; // ✅ devuelve el array correcto
  }
  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
  }

  completePurchase(): void {
    this._purchaseCompleted.next(true);
    this.clearCart();
  }

  resetPurchaseFlag(): void {
    this._purchaseCompleted.next(false);
  }
}