import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth';
import {BookResponse} from '../../models/book';
import {BookService} from '../../services/book';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-book-detail',
  imports: [
    NgIf
  ],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetail implements OnInit{

   book = signal<BookResponse | null>(null)
   loading = signal(false)
   bookId = ""

  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private authService = inject(AuthService)
  private bookService = inject(BookService)

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id')!;
    if (this.bookId) {
      this.loadBook();
    } else {
      this.router.navigate(['/user/catalogue']);
    }
  }


    loadBook(){
      this.loading.set(true)
      this.bookService.getBookById(this.bookId).subscribe({
        next: (book) => {
          console.log('Book loaded:', book);
          this.book.set(book)
          this.loading.set(false)
        },
        error: () => {
          this.loading.set(false)
          this.router.navigate(["/user/catalogue"])

        }
      })

    }

  goBack(): void {
    this.router.navigate(["/user/catalogue"])
  }
}
