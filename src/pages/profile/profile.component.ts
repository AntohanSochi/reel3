
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TelegramService } from '../../services/telegram.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  authService = inject(AuthService);
  telegramService = inject(TelegramService);
  user = this.authService.currentUser;

  // Mock data for generation history
  generationHistory = [
    { type: 'ContentForge', title: 'Blog Post: "The Future of AI"', date: '2024-07-22' },
    { type: 'AdGenius', title: 'Ad Copy for "Summer Sale"', date: '2024-07-21' },
    { type: 'TrendPulse', title: 'Analysis: "TikTok Marketing"', date: '2024-07-20' },
  ];

  logout() {
    this.telegramService.hapticFeedback('heavy');
    this.authService.logout();
  }
}
