import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BookRequest, BookResponse, UpdateBookRequest} from '../models/book';
import {PaginatedResponse} from '../models/PaginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class BookService{
  private apiUrl = 'http://localhost:8080/api/books';
  constructor(private http: HttpClient) {}

  getAllBooks(page: number = 0, size: number = 10): Observable<PaginatedResponse<BookResponse>> {
    return this.http.get<PaginatedResponse<BookResponse>>(
      `${this.apiUrl}?page=${page}&size=${size}`
    );
  }

  getBookById(id: string): Observable<BookResponse> {
    return this.http.get<BookResponse>(`${this.apiUrl}/${id}`);
  }

  getAvailableBooks():Observable<BookResponse[]> {
    return this.http.get<BookResponse[]>(`${this.apiUrl}/available`)
  }

  addBook(request:BookRequest):Observable<BookResponse>{
    return this.http.post<BookResponse>(`${this.apiUrl}`,request);
  }

  updateBook(id:string,request:UpdateBookRequest):Observable<BookResponse>{
    return this.http.patch<BookResponse>(`${this.apiUrl}/${id}`,request)
  }

  deleteBook(id:string):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchBooks(
    query?: string,
    author?: string,
    page: number = 0,
    size: number = 10): Observable<PaginatedResponse<BookResponse>> {

    let params = new HttpParams()
      .set('page', page)
      .set('size', size);
    if (query) {
      params = params.set('query', query);
    }
    if (author) {
      params = params.set('author', author);
    }
    return this.http.get<PaginatedResponse<BookResponse>>(
      `${this.apiUrl}/search`,
      { params }
    );
  }


}
