
import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { TelegramService } from './telegram.service';
import { ApiService } from './api.service';
import { ToastService } from './toast.service';
import { tap, catchError, of } from 'rxjs';

const USER_SESSION_KEY = 'reelgenix_user';
const JWT_SESSION_KEY = 'reelgenix_jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // FIX: Explicitly type the injected Router to resolve type inference issue.
  private router: Router = inject(Router);
  private telegramService = inject(TelegramService);
  private apiService = inject(ApiService);
  private toastService = inject(ToastService);
  
  currentUser = signal<User | null>(this.getStoredUser());
  jwt = signal<string | null>(this.getStoredJwt());

  isLoggedIn = computed(() => !!this.currentUser());
  isAdmin = computed(() => this.currentUser()?.role === 'admin');

  private getStoredUser(): User | null {
    const user = sessionStorage.getItem(USER_SESSION_KEY);
    return user ? JSON.parse(user) : null;
  }

  private getStoredJwt(): string | null {
    return sessionStorage.getItem(JWT_SESSION_KEY);
  }

  login() {
    const initData = this.telegramService.getInitData();
    if (!initData) {
      this.toastService.show('error', 'Telegram initData not available. Please open this app through Telegram.');
      console.error('Telegram initData is missing.');
      return;
    }
    
    // In a real app, you would get start_param here.
    // const start_param = this.telegramService.getStartParam();

    this.apiService.authTWA(initData).pipe(
      tap(response => {
        this.setSession(response.jwt, response.user);
        this.toastService.show('success', 'Successfully logged in!');
        this.router.navigate(['/home']);
      }),
      catchError(err => {
        this.toastService.show('error', 'Authentication failed. Please try again.');
        console.error('Auth error:', err);
        return of(null);
      })
    ).subscribe();
  }

  logout() {
    sessionStorage.removeItem(USER_SESSION_KEY);
    sessionStorage.removeItem(JWT_SESSION_KEY);
    this.currentUser.set(null);
    this.jwt.set(null);
    this.router.navigate(['/login']);
    // In a real TWA, you might close the app
    // this.telegramService.close();
  }

  private setSession(jwt: string, user: User) {
    sessionStorage.setItem(JWT_SESSION_KEY, jwt);
    sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(user));
    this.jwt.set(jwt);
    this.currentUser.set(user);
    this.apiService.setAuthToken(jwt);
  }

  constructor() {
    const token = this.getStoredJwt();
    if (token) {
      this.apiService.setAuthToken(token);
    }
  }
}
