
import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toast = signal<Toast | null>(null);

  show(type: Toast['type'], message: string, duration = 4000) {
    this.toast.set({ type, message, duration });
  }

  clear() {
    this.toast.set(null);
  }
}
