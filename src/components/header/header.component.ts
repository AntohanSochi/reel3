
import { Component, ChangeDetectionStrategy, output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  toggleSidebar = output<void>();

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
