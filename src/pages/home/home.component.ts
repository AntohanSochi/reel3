
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

// Mock data, to be replaced by API calls
const QUICK_ACTIONS = [
  { icon: 'zap', name: 'TrendPulse', description: 'Analyze market trends' },
  { icon: 'edit-3', name: 'ContentForge', description: 'Generate blog posts' },
  { icon: 'award', name: 'AI Critic', description: 'Get content feedback' },
  { icon: 'bar-chart-2', name: 'EngageMax', description: 'Optimize engagement' },
  { icon: 'dollar-sign', name: 'AdGenius', description: 'Create ad copy' },
  { icon: 'trending-up', name: 'GrowthHacker', description: 'Find growth strategies' },
];

const RECENT_GENERATIONS = [
  { id: 'gen1', type: 'TrendPulse', title: 'Analysis of Q3 Social Media...', date: '2024-07-22T10:30:00Z' },
  { id: 'gen2', type: 'ContentForge', title: 'Top 5 AI Tools for Marketers', date: '2024-07-22T09:15:00Z' },
  { id: 'gen3', type: 'AdGenius', title: 'Ad Copy for Summer Sale Campaign', date: '2024-07-21T18:00:00Z' },
];

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  authService = inject(AuthService);
  user = this.authService.currentUser;
  
  quickActions = signal(QUICK_ACTIONS);
  recentGenerations = signal(RECENT_GENERATIONS);
}
