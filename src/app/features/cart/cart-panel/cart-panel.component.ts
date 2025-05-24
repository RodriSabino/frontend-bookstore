import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutFormComponent } from '../../checkout/checkout-form/checkout-form.component';
declare var bootstrap: any;

@Component({
  selector: 'app-cart-panel',
  imports: [CommonModule],
  templateUrl: './cart-panel.component.html',
  styleUrl: './cart-panel.component.scss'
})
export class CartPanelComponent {
  cart = [
    { id: 1, name: 'Harry Potter', quantity: 2, price: 50 },
    { id: 2, name: '1984', quantity: 1, price: 45 }
  ];


  get total(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  resetCart() {
    this.cart = [];
  }


  increment(item: any) {
    item.quantity++;
  }
  
  decrement(item: any) {
    if (item.quantity > 1) item.quantity--;
  }
  
  remove(item: any) {
    this.cart = this.cart.filter(i => i.id !== item.id);
  }

}