import {Component, OnInit, signal} from '@angular/core';
import {AuthService} from '../../services/auth';
import {Router, RouterLink} from '@angular/router';
import {BookService} from '../../services/book';
import {Book, BookResponse} from '../../models/book';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    NgOptimizedImage
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList implements OnInit{
  books = signal<BookResponse[]>([]);
  loading = signal(false);

  page = signal(0);
  size = signal(10);
  totalPages = signal(0);

  constructor(
    private bookService:BookService,
    protected authService: AuthService,
  ) {}

  ngOnInit(): void {
      this.loadBooks()
    }


    loadBooks(): void {
      this.loading.set(true);
      this.bookService.getAllBooks(this.page(), this.size())
        .subscribe({
          next: (response) => {
            console.log(response.content)
            this.books.set(response.content);
            this.totalPages.set(response.total_pages);
            this.page.set(response.page);
            this.loading.set(false);
          },
          error: (err) => {
            console.error('Erreur lors du chargement des livres:', err);
            this.loading.set(false);
          }
        });
    }

}
