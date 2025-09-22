
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {
  private apiService = inject(ApiService);
  private toastService = inject(ToastService);

  stats = signal<any>(null);
  isLoading = signal(true);

  constructor() {
    this.loadStats();
  }

  loadStats() {
    this.isLoading.set(true);
    this.apiService.adminStats().pipe(
      tap(data => {
        this.stats.set(data);
        this.isLoading.set(false);
      }),
      catchError(err => {
        this.toastService.show('error', 'Failed to load admin stats.');
        this.isLoading.set(false);
        return of(null);
      })
    ).subscribe();
  }
}
