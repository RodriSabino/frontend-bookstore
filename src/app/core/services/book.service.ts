import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from '../models/book.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseUrl = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  searchBooks(term: string): Observable<Book[]> {
    const params = new HttpParams().set('name', term);
    return this.http.get<Book[]>(`${this.baseUrl}/search`, { params });
  }
}