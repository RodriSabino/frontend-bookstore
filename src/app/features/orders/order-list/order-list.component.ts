import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {
  ordersPerPage = 3;
  currentPage = 1;

  orders = [
    {
      id: 1,
      client: 'Juan Pérez',
      voucher: 'B001',
      pdfUrl: '#',
      items: [
        { name: 'Harry Potter', quantity: 2, price: 45.9 },
        { name: 'El Principito', quantity: 1, price: 30 },
      ],
    },
    {
      id: 2,
      client: 'María López',
      voucher: 'B002',
      pdfUrl: '#',
      items: [{ name: 'Cien años de soledad', quantity: 1, price: 55 }],
    },
    {
      id: 3,
      client: 'Carlos Ruiz',
      voucher: 'B003',
      pdfUrl: '#',
      items: [
        { name: 'Don Quijote', quantity: 1, price: 60 },
        { name: '1984', quantity: 1, price: 40 },
      ],
    },
    {
      id: 4,
      client: 'Ana Torres',
      voucher: 'B004',
      pdfUrl: '#',
      items: [{ name: 'La Odisea', quantity: 2, price: 35 }],
    },
  ];

  get totalPages(): number {
    return Math.ceil(this.orders.length / this.ordersPerPage);
  }

  get totalPagesArray(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  get paginatedOrders() {
    const start = (this.currentPage - 1) * this.ordersPerPage;
    return this.orders.slice(start, start + this.ordersPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  getOrderTotal(order: any): number {
    return order.items.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
  }
}