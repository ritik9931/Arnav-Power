import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="section-header" [class.text-center]="align === 'center'" [class.text-left]="align === 'left'" [class.is-dark]="theme === 'dark'">
      @if (badge) {
        <div class="header-badge-wrapper">
          <span class="badge-tag" [ngClass]="badgeClass">
            <span class="badge-dot"></span>
            {{ badge }}
          </span>
        </div>
      }
      <h2 class="header-title" [innerHTML]="title"></h2>
      @if (subtitle) {
        <p class="header-subtitle">{{ subtitle }}</p>
      }
    </div>
  `,
  styles: [`
    .section-header {
      margin-bottom: 3.5rem;
      position: relative;

      &.text-center {
        text-align: center;
        .header-badge-wrapper {
          justify-content: center;
        }
        .header-subtitle {
          margin-left: auto;
          margin-right: auto;
        }
      }

      &.text-left {
        text-align: left;
      }
    }

    .header-badge-wrapper {
      display: flex;
      margin-bottom: 0.85rem;
    }

    .badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: currentColor;
    }

    .header-title {
      font-size: 2.25rem;
      font-weight: 800;
      line-height: 1.2;
      color: var(--color-text-main);
      margin-bottom: 1rem;
      letter-spacing: -0.025em;

      @media (min-width: 768px) {
        font-size: 2.75rem;
      }
    }

    .header-subtitle {
      font-size: 1.05rem;
      color: var(--color-text-muted);
      max-width: 680px;
      line-height: 1.65;
    }

    .is-dark {
      .header-title {
        color: #FFFFFF;
      }
      .header-subtitle {
        color: #94A3B8;
      }
    }
  `]
})
export class SectionHeaderComponent {
  @Input() badge: string = '';
  @Input() badgeType: 'gis' | 'solar' | 'primary' | 'dark' = 'primary';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() align: 'center' | 'left' = 'center';
  @Input() theme: 'light' | 'dark' = 'light';

  get badgeClass(): string {
    if (this.theme === 'dark') return 'badge-dark';
    switch (this.badgeType) {
      case 'gis': return 'badge-gis';
      case 'solar': return 'badge-solar';
      case 'dark': return 'badge-dark';
      default: return 'badge-primary';
    }
  }
}
