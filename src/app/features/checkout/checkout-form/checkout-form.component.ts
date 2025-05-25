import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';
import { CheckoutService } from '../../../core/services/checkout.service';
import { CartItem } from '../../../core/services/cart.service';
declare var bootstrap: any;

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.scss'
})
export class CheckoutFormComponent {
  checkoutForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private checkoutService: CheckoutService
  ) {
    this.checkoutForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      doc_type: ['', Validators.required],
      doc_number: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      voucher_type: ['B', Validators.required]  
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const {
      first_name,
      last_name,
      doc_type,
      doc_number,
      phone,
      email,
      voucher_type
    } = this.checkoutForm.value;
    
    const cartItems: CartItem[] = this.cartService.getItems();

    const payload = {
      client: {
        first_name,
        last_name,
        doc_type,
        doc_number,
        phone,
        email
      },
      voucher_type,
      cart: cartItems.map(item => ({
        book_id: item.book.id,
        quantity: item.quantity
      }))
    };

    this.checkoutService.processCheckout(payload).subscribe({
      next: res => {
        console.log('✅ Orden procesada:', res.data);
        this.cartService.completePurchase();
        this.showToast();
      },
      error: err => {
        console.error('❌ Error en checkout:', err);
        alert(err.error?.error || 'Error al procesar la compra.');
      }
    });
  }
  submitFromParent(): void {
    this.onSubmit();
  }
  private showToast(): void {
    const toastElement = document.getElementById('purchaseToast');
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement, { delay: 5000 });
      toast.show();
    }
  }
}