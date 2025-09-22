
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupportComponent {
  private apiService = inject(ApiService);
  private toastService = inject(ToastService);

  faq = signal<any[]>([]);
  isLoadingFaq = signal(true);
  
  ticket = { subject: '', message: '' };
  isSubmittingTicket = signal(false);

  constructor() {
    this.loadFaq();
  }
  
  loadFaq() {
    this.isLoadingFaq.set(true);
    this.apiService.getFAQ().pipe(
      tap(data => {
        this.faq.set(data.length > 0 ? data : this.getDefaultFaq());
        this.isLoadingFaq.set(false);
      }),
      catchError(() => {
        this.toastService.show('error', 'Could not load FAQ.');
        this.faq.set(this.getDefaultFaq());
        this.isLoadingFaq.set(false);
        return of(null);
      })
    ).subscribe();
  }

  submitTicket() {
    if (!this.ticket.subject || !this.ticket.message) {
      this.toastService.show('error', 'Please fill out all fields.');
      return;
    }
    this.isSubmittingTicket.set(true);
    this.apiService.createTicket(this.ticket).pipe(
      tap(() => {
        this.toastService.show('success', 'Support ticket created successfully!');
        this.ticket = { subject: '', message: '' };
        this.isSubmittingTicket.set(false);
      }),
      catchError(() => {
        this.toastService.show('error', 'Failed to create ticket. Please try again.');
        this.isSubmittingTicket.set(false);
        return of(null);
      })
    ).subscribe();
  }
  
  getDefaultFaq() {
    return [
      { q: 'What is ReelGenixBloggerKit?', a: 'It is an all-in-one toolkit for bloggers to automate content creation and management.' },
      { q: 'How do I upgrade my plan?', a: 'You can upgrade your plan from the Pricing page at any time.' },
      { q: 'Where can I see my usage?', a: 'Your current usage and limits are displayed on your Profile page.' },
    ];
  }
}
