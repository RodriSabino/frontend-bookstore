import { Component, OnInit } from '@angular/core';
import { Book } from '../../../core/models/book.model'; 
import { BookService } from '../../../core/services/book.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../core/services/cart.service';
declare var bootstrap: any;
@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  searchTerm = '';
  books: Book[] = [];

  constructor(private bookService: BookService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadBooks();
  }
  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: books => this.books = books,
      error: err => console.error('Error cargando libros', err)
    });
  }
  addToCart(book: Book): void {
    const cart = this.cartService.getCart();
    const itemInCart = cart.find(item => item.book.id === book.id);
    const currentQuantity = itemInCart?.quantity ?? 0;
  
    // Validar que haya stock suficiente
    if (book.stock <= 0) {
      this.showErrorToast(`❌ No hay stock disponible para "${book.name}"`);
      return;
    }
  
    if (currentQuantity >= book.stock) {
      this.showErrorToast(`❌ Solo hay ${book.stock} unidades disponibles de "${book.name}"`);
      return;
    }
  
    // Agrega al carrito si pasa validaciones
    this.cartService.addToCart(book);
    this.showAddToCartToast(book.name);
  }
  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.bookService.searchBooks(this.searchTerm.trim()).subscribe({
        next: books => this.books = books,
        error: err => console.error('Error en búsqueda', err)
      });
    } else {
      this.loadBooks();
    }
  }
  
  showAddToCartToast(bookName: string): void {
    const toastElement = document.getElementById('addToCartToast');
    const toastBody = document.getElementById('addToCartToastBody');
  
    if (toastElement && toastBody) {
      toastBody.textContent = `${bookName} ha sido agregado al carrito.`;
  
      const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
      toast.show();
    }
  }
  showErrorToast(message: string): void {
  const toastElement = document.getElementById('errorToast');
  const toastBody = document.getElementById('errorToastBody');

  if (toastElement && toastBody) {
    toastBody.textContent = message;

    const toast = new bootstrap.Toast(toastElement, { delay: 4000 });
    toast.show();
  }
}
}