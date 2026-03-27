import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth';
import {AuthResponse, Role} from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [
    ReactiveFormsModule,
  ],
  standalone: true
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  errorMessage = signal('');
  isLoading = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.redirectBasedOnRole();
    }

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      this.authService.login(this.loginForm.value).subscribe({
        next: (response: AuthResponse) => {
          this.redirectBasedOnRole();
        },
        error: (error) => {
          console.error('Erreur de connexion:', error);

          if (error.status === 401) {
            this.errorMessage.set('Nom d\'utilisateur ou mot de passe incorrect');
          } else if (error.status === 0 || error.status === 500) {
            this.errorMessage.set('Erreur serveur. Veuillez réessayer plus tard.');
          } else {
            this.errorMessage.set(error.error?.message || 'Une erreur est survenue');
          }

          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        }
      });
    }
  }
  private redirectBasedOnRole(): void {
    const role = this.authService.getUserRole();
    setTimeout(() => {
      if (role === Role.ADMIN) {
        this.router.navigate(['/admin/dashboard']);
      } else if (role === Role.USER) {
        this.router.navigate(['/user/catalogue']);
      } else {
        this.errorMessage.set('Rôle utilisateur non reconnu');
        this.authService.logout();
      }
    }, 100);
  }
}
