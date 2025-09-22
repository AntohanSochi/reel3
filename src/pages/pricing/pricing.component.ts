
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Mock data
const SUBSCRIPTIONS = [
  { name: 'Free', price: '0₽', period: '/ forever', features: ['5 Generations/month', 'Basic Features', 'Community Support'], isPopular: false },
  { name: 'Standard', price: '499₽', period: '/ month', features: ['50 Generations/month', 'Standard Features', 'Email Support', 'Trend Analytics'], isPopular: true },
  { name: 'Pro', price: '999₽', period: '/ month', features: ['150 Generations/month', 'Pro Features', 'Priority Support', 'API Access'], isPopular: false },
  { name: 'Business', price: '2499₽', period: '/ month', features: ['500 Generations/month', 'All Features', 'Dedicated Support', 'Team Accounts'], isPopular: false },
];
const PACKAGES = [
  { name: '10 Generations', price: '149₽' },
  { name: '50 Generations', price: '599₽' },
  { name: '100 Generations', price: '999₽' },
];

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingComponent {
  subscriptions = signal(SUBSCRIPTIONS);
  packages = signal(PACKAGES);
  billingCycle = signal<'monthly' | 'yearly'>('monthly');

  toggleBilling() {
    this.billingCycle.update(c => c === 'monthly' ? 'yearly' : 'monthly');
  }
}
