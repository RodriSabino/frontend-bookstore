import { Component, OnInit } from '@angular/core';
import { Book } from '../../../core/models/book.model'; // define este modelo
import { BookService } from '../../../core/services/book.service'; // lo creamos luego
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
  searchTerm = '';
  books = [
    {
      id: 1,
      isbn: '9783161484100',
      name: 'El Señor de los Anillos',
      stock: 5,
      price: 49.99,
      image: 'https://m.media-amazon.com/images/I/81eB+7+CkUL._AC_UF1000,1000_QL80_.jpg'
    },
    {
      id: 2,
      isbn: '9788478884452',
      name: 'Harry Potter y la Piedra Filosofal',
      stock: 8,
      price: 39.99,
      image: 'https://static.wikia.nocookie.net/esharrypotter/images/9/9a/Harry_Potter_y_la_Piedra_Filosofal_Portada_Espa%C3%B1ol.PNG/revision/latest/scale-to-width/360?cb=20151020165725'
    },
    {
      id: 3,
      isbn: '9788478884452',
      name: 'Harry Potter y la Piedra Filosofal',
      stock: 8,
      price: 39.99,
      image: 'https://static.wikia.nocookie.net/esharrypotter/images/9/9a/Harry_Potter_y_la_Piedra_Filosofal_Portada_Espa%C3%B1ol.PNG/revision/latest/scale-to-width/360?cb=20151020165725'
    },
    {
      id: 4,
      isbn: '9788478884452',
      name: 'Harry Potter y la Piedra Filosofal',
      stock: 8,
      price: 39.99,
      image: 'https://static.wikia.nocookie.net/esharrypotter/images/9/9a/Harry_Potter_y_la_Piedra_Filosofal_Portada_Espa%C3%B1ol.PNG/revision/latest/scale-to-width/360?cb=20151020165725'
    }, 
    {
      id: 5,
      isbn: '9788478884452',
      name: 'Harry Potter y la Piedra Filosofal',
      stock: 8,
      price: 39.99,
      image: 'https://static.wikia.nocookie.net/esharrypotter/images/9/9a/Harry_Potter_y_la_Piedra_Filosofal_Portada_Espa%C3%B1ol.PNG/revision/latest/scale-to-width/360?cb=20151020165725'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}