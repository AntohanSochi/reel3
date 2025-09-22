
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  role: 'user' | 'admin';
  plan: 'free' | 'standard' | 'pro' | 'business';
  generationsLeft: number;
  subscriptionExpires?: string; // ISO date string
}
