
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { User } from '../models/user.model';

// In a real app, these would be in an environment file
const VITE_API_BASE = 'https://api.example.com'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private authToken: string | null = null;

  setAuthToken(token: string) {
    this.authToken = token;
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (this.authToken) {
      headers = headers.set('Authorization', `Bearer ${this.authToken}`);
    }
    return headers;
  }

  // Mock implementation, replace with actual HTTP calls
  authTWA(initData: string): Observable<{ jwt: string, user: User }> {
    console.log('Mock API: Authenticating with initData');
    const mockUser: User = {
      id: '12345',
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      role: 'admin', // 'user' or 'admin' for testing
      plan: 'pro',
      generationsLeft: 138,
      subscriptionExpires: '2024-12-31T23:59:59Z'
    };
    const mockJwt = 'mock-jwt-token-string';
    
    // In a real app:
    // return this.http.post<{ jwt: string, user: User }>(`${VITE_API_BASE}/twa/auth`, { initData }, { headers: this.getHeaders() });
    return of({ jwt: mockJwt, user: mockUser }).pipe(delay(500));
  }
  
  // Example of other mock methods
  getProducts(): Observable<any> {
    console.log('Mock API: Getting products');
    return of({}).pipe(delay(500));
  }

  generate(payload: any): Observable<any> {
    console.log('Mock API: Generating content with payload', payload);
    const mockResult = {
        text: "This is the generated content based on your prompt. It's designed to be engaging and SEO-friendly...",
        downloadUrl: '/mock-download.txt'
    };
    return of({ result: mockResult }).pipe(delay(2000));
  }
  
  getPricing(): Observable<any> {
    console.log('Mock API: Getting pricing');
    return of({}).pipe(delay(500));
  }
  
  orderPack(packId: string): Observable<any> {
    console.log('Mock API: Ordering pack', packId);
    return of({ redirect_url: 'https://boosty.to/mock-payment' }).pipe(delay(500));
  }
  
  getReferral(): Observable<any> {
    console.log('Mock API: Getting referral data');
    const mockData = {
        code: 'REF123XYZ',
        link: 'https://t.me/ReelGenixBot?start=REF123XYZ',
        referredUsers: 15,
        earnings: 450
    };
    return of(mockData).pipe(delay(500));
  }
  
  getFAQ(): Observable<any> {
    console.log('Mock API: Getting FAQ');
    const mockFaq = [
        { q: 'How does generation work?', a: 'Our AI analyzes your prompt and generates unique content based on vast amounts of data.' },
        { q: 'Can I cancel my subscription?', a: 'Yes, you can cancel your subscription at any time from your profile page.' }
    ];
    return of(mockFaq).pipe(delay(500));
  }
  
  createTicket(ticketData: any): Observable<any> {
    console.log('Mock API: Creating support ticket', ticketData);
    return of({ success: true, ticketId: 'TICKET-98765' }).pipe(delay(1000));
  }

  adminStats(): Observable<any> {
    console.log('Mock API: Getting admin stats');
    const mockStats = {
        totalUsers: 1258,
        monthlyRevenue: 15670,
        activeSubscriptions: 432,
        generationsToday: 873,
        systemStatus: {
            frontendVersion: '1.2.0',
            apiVersion: 'v1.5.3',
            apiPing: 45, // ms
            errors24h: 3
        },
        recentGenerations: [
          { user: 'jane.doe', type: 'ContentForge', timestamp: new Date().toISOString() },
          { user: 'mike.p', type: 'AdGenius', timestamp: new Date().toISOString() },
        ]
    };
    return of(mockStats).pipe(delay(800));
  }
}
