import { Injectable } from '@angular/core';

declare global {
  interface Window {
    Telegram: any;
  }
}

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private tg: any;

  constructor() {
    const realTg = window.Telegram?.WebApp;
    // Use mock if the real one doesn't exist OR if its initData is empty/falsy.
    if (realTg && realTg.initData) {
      this.tg = realTg;
    } else {
      console.warn('Telegram WebApp script not found or initData is empty. Using mock Telegram object for development.');
      this.tg = this.createMockWebApp();
    }
  }

  private createMockWebApp() {
    return {
      // Return a mock initData string to allow the auth flow to proceed in a browser
      initData: 'dev_mock_query_id=123&user=%7B%22id%22%3A12345%2C%22first_name%22%3A%22Dev%22%2C%22last_name%22%3A%22User%22%2C%22username%22%3A%22devuser%22%2C%22language_code%22%3A%22en%22%7D&auth_date=1620000000&hash=mock_hash',
      initDataUnsafe: {
        start_param: 'mock_start_param',
        user: {
          id: 12345,
          first_name: 'Dev',
          last_name: 'User',
          username: 'devuser',
          language_code: 'en'
        }
      },
      ready: () => console.log('Mock TG: ready() called.'),
      expand: () => console.log('Mock TG: expand() called.'),
      HapticFeedback: {
        impactOccurred: (style: string) => console.log(`Mock TG Haptic: impactOccurred with style: ${style}`),
        notificationOccurred: (type: string) => console.log(`Mock TG Haptic: notificationOccurred with type: ${type}`),
      },
      openLink: (url: string) => {
        console.log(`Mock TG: opening link in new tab: ${url}`);
        window.open(url, '_blank');
      },
      close: () => console.log('Mock TG: close() called.'),
    };
  }

  ready() {
    this.tg.ready();
  }

  expand() {
    this.tg.expand();
  }

  getInitData(): string | null {
    return this.tg.initData || null;
  }

  getInitDataUnsafe() {
    return this.tg.initDataUnsafe || {};
  }
  
  getStartParam(): string | null {
    return this.getInitDataUnsafe().start_param || null;
  }

  hapticFeedback(type: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light') {
    this.tg.HapticFeedback.impactOccurred(type);
  }
  
  notification(type: 'error' | 'success' | 'warning') {
    this.tg.HapticFeedback.notificationOccurred(type);
  }

  openLink(url: string) {
    this.tg.openLink(url);
  }

  close() {
    this.tg.close();
  }
}
