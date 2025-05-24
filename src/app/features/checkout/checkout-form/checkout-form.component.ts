import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.scss'
})
export class CheckoutFormComponent {
  @Output() purchaseConfirmed = new EventEmitter<void>();
  checkoutForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.checkoutForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      doc_type: ['', Validators.required],
      doc_number: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    console.log('🔍 Ejecutando onSubmit() del hijo');
  
    if (this.checkoutForm.invalid) {
      console.warn('❌ Formulario inválido');
      this.checkoutForm.markAllAsTouched();
      return;
    }
  
    console.log('✅ Formulario válido. Datos:', this.checkoutForm.value);
  
    // ✅ Emitimos el evento al padre
    this.purchaseConfirmed.emit();
  }
  submitFromParent(): void {
    this.onSubmit();
  }
}