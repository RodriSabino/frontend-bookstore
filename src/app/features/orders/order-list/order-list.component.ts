import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../core/models/order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {
  ordersPerPage = 4;
  currentPage = 1;
  totalPages = 1;
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getOrders(this.currentPage, this.ordersPerPage).subscribe({
      next: (res) => {
        this.orders = res.data;
        this.totalPages = res.meta.totalPages;
      },
      error: (err) => {
        console.error('Error al cargar órdenes', err);
      }
    });
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.fetchOrders();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchOrders();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchOrders();
    }
  }

  getOrderTotal(order: Order): number {
    return order.details.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  get paginatedOrders(): Order[] {
    return this.orders; // Ya paginados por el backend
  }
}