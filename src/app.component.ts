
import { Component, ChangeDetectionStrategy, inject, signal, computed, effect } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

import { AnimatedBackgroundComponent } from './components/animated-background/animated-background.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AuthService } from './services/auth.service';
import { ToastComponent } from './components/toast/toast.component';
import { TelegramService } from './services/telegram.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AnimatedBackgroundComponent,
    HeaderComponent,
    SidebarComponent,
    ToastComponent
  ],
})
export class AppComponent {
  private authService = inject(AuthService);
  // FIX: Explicitly type the injected Router to resolve type inference issue.
  private router: Router = inject(Router);
  private telegramService = inject(TelegramService);

  isLoggedIn = this.authService.isLoggedIn;
  isSidebarOpen = signal(false);

  constructor() {
    this.telegramService.ready();
    this.telegramService.expand();
    
    // Close sidebar on navigation
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isSidebarOpen.set(false);
    });
  }

  toggleSidebar() {
    this.isSidebarOpen.update(isOpen => !isOpen);
  }
}
