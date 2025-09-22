
import { Component, ChangeDetectionStrategy, input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  isOpen = input.required<boolean>();

  private authService = inject(AuthService);

  user = this.authService.currentUser;
  isAdmin = this.authService.isAdmin;

  logout() {
    this.authService.logout();
  }
}
