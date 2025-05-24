import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CartPanelComponent } from '../../features/cart/cart-panel/cart-panel.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CheckoutFormComponent } from '../../features/checkout/checkout-form/checkout-form.component';
import { CartService } from '../../core/services/cart.service';
declare var bootstrap: any;

@Component({
  selector: 'app-main-layout',
  imports: [RouterModule, CartPanelComponent, NavbarComponent, CheckoutFormComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {
  @ViewChild(CheckoutFormComponent) checkoutFormComponent!: CheckoutFormComponent;
  @ViewChild('checkoutModalRef', { static: false }) checkoutModalRef!: ElementRef;

  private confirmationModal: any;
  private checkoutModal: any;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.purchaseCompleted$.subscribe(completed => {
      if (completed) {
        this.closeCheckoutModal();
        this.openConfirmationModal();
        this.cartService.resetPurchaseFlag();
      }
    });
  }
  handlePurchaseConfirmed(): void {
    this.closeCheckoutModal();
    this.showToast();
  }
  ngAfterViewInit(): void {
    this.checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    this.confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
  }

  closeCheckoutModal(): void {
    const modalEl = document.getElementById('checkoutModal');
    if (modalEl) {
      let modalInstance = bootstrap.Modal.getInstance(modalEl);
      if (!modalInstance) {
        modalInstance = new bootstrap.Modal(modalEl);
      }
      modalInstance.hide();
    }
  
    // 🔧 Eliminamos manualmente el backdrop si quedó atascado
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
      document.body.classList.remove('modal-open');
      document.body.style.overflow = 'auto'; // 👈 previene scroll bloqueado
    }
  }
  confirmPurchase(): void {
    if (this.checkoutFormComponent) {
      this.checkoutFormComponent.submitFromParent();
    }
  }
  showToast(): void {
    const toastElement = document.getElementById('purchaseToast');
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement, { delay: 5000 }); // ⏱️ 5 segundos
      toast.show();
    }
  }
  openConfirmationModal() {
    this.confirmationModal?.show();
  }

  resetCart() {
    // Aquí puedes vaciar el carrito si lo manejas desde el servicio
  }
}