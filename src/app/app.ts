import { ChangeDetectorRef, Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {AuthService} from './services/auth';
import {filter} from 'rxjs';
import {Navbar} from './shared/navbar/navbar';
import {Footer} from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  currentRoute: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
      this.cdr.markForCheck();
    });
  }


  showNavbarAndFooter(): boolean {
    const excludedRoutes = ['/login'];
    if (excludedRoutes.some(route => this.currentRoute.startsWith(route))) {
      return false;
    }
    return this.authService.isAuthenticated();
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
