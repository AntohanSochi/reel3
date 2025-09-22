
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { TelegramService } from '../../services/telegram.service';
import { tap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-referrals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './referrals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferralsComponent {
  private apiService = inject(ApiService);
  private toastService = inject(ToastService);
  private telegramService = inject(TelegramService);
  
  referralData = signal<any>(null);
  isLoading = signal(true);

  // In a real app, this would come from an environment variable
  private VITE_REF_BASE = 'https://t.me/YourBotName?start=';

  constructor() {
    this.loadReferralData();
  }

  loadReferralData() {
    this.isLoading.set(true);
    this.apiService.getReferral().pipe(
      tap(data => {
        this.referralData.set({ ...data, link: this.VITE_REF_BASE + data.code });
        this.isLoading.set(false);
      }),
      catchError(() => {
        this.toastService.show('error', 'Could not load referral data.');
        this.isLoading.set(false);
        return of(null);
      })
    ).subscribe();
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.toastService.show('success', 'Copied to clipboard!');
      this.telegramService.hapticFeedback();
    }).catch(() => {
      this.toastService.show('error', 'Failed to copy.');
    });
  }

  shareOnTelegram(link: string) {
    const url = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent('Check out this awesome tool for bloggers!')}`;
    this.telegramService.openLink(url);
  }
}
