import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { Role } from '../models/user';


export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

export const AdminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  }

  const role = authService.getUserRole();
  if (role === Role.USER) {
    router.navigate(['/user/catalogue']);
  } else {
    router.navigate(['/login']);
  }
  return false;
};
export const UserGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isUser()) {
    return true;
  }

  const role = authService.getUserRole();
  if (role === Role.ADMIN) {
    router.navigate(['/admin/dashboard']);
  } else {
    router.navigate(['/login']);
  }
  return false;
};
