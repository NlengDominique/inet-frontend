import { Routes } from '@angular/router';
import {Login} from './shared/login/login';
import {AuthGuard, UserGuard} from './guards/auth-guard-guard';
import {BookList} from './user/book-list/book-list';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },

  {
    path: 'user',
    canActivate: [AuthGuard, UserGuard],
    children: [
      { path: '', redirectTo: 'catalogue', pathMatch: 'full' },
      { path: 'catalogue', component: BookList }
    ]
  },
];
