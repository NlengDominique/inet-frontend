import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {AuthResponse} from '../../models/user';
import {AuthService} from '../../services/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',

  styleUrls: ['./navbar.css'],
  standalone: true,

  imports: [
    RouterLink,
    RouterLinkActive
  ]
})
export class Navbar implements OnInit {
  currentUser: AuthResponse | null = null;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.cdr.markForCheck();
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isUser(): boolean {
    return this.authService.isUser();
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
}
