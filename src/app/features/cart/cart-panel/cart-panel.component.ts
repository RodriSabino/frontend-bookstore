import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutFormComponent } from '../../checkout/checkout-form/checkout-form.component';
import { CartService, CartItem } from '../../../core/services/cart.service';
declare var bootstrap: any;

@Component({
  selector: 'app-cart-panel',
  imports: [CommonModule],
  templateUrl: './cart-panel.component.html',
  styleUrl: './cart-panel.component.scss'
})
export class CartPanelComponent {
  cart: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cart = items;
    });
  }

  increment(item: CartItem): void {
    this.cartService.updateQuantity(item.book.id, item.quantity + 1);
  }

  decrement(item: CartItem): void {
    this.cartService.updateQuantity(item.book.id, item.quantity - 1);
  }

  remove(item: CartItem): void {
    this.cartService.removeFromCart(item.book.id);
  }

  get total(): number {
    return this.cartService.getTotal();
  }

  resetCart(): void {
    this.cartService.clearCart();
  }

}