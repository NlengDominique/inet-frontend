import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import {LoginRequest, AuthResponse, Role} from '../models/user';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly USER_STORAGE_KEY = 'currentUser';
  private readonly TOKEN_STORAGE_KEY = 'authToken';

  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    try {
      const storedUser = localStorage.getItem(this.USER_STORAGE_KEY);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      }
    } catch (error) {
      this.clearStorage();
    }
  }
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem(this.TOKEN_STORAGE_KEY, response.token)
          localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(response));
          this.currentUserSubject.next(response);
        } else {
          throw new Error('Réponse invalide du serveur');
        }
      }),
      catchError(error => {
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    this.clearStorage();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login'])
  }

  private clearStorage(): void {
    localStorage.removeItem(this.USER_STORAGE_KEY);
    localStorage.removeItem(this.TOKEN_STORAGE_KEY);
  }

  getCurrentUser(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN;
  }

  isUser(): boolean {
    return this.getUserRole() === Role.USER;
  }

  getUserRole(): Role | null {
    return this.currentUserSubject.value?.role ?? null;
  }
}
