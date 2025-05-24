import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { BookListComponent } from './features/books/book-list/book-list.component';
import { OrderListComponent } from './features/orders/order-list/order-list.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'books', pathMatch: 'full' },
      { path: 'books', component: BookListComponent },
      { path: 'orders', component: OrderListComponent },
    ]
  },
];