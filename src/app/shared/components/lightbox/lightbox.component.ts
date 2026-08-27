import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryImage } from '../../../core/models/project.model';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen && currentImage) {
      <div class="lightbox-backdrop" (click)="closeLightbox()">
        <div class="lightbox-dialog" (click)="$event.stopPropagation()">
          <button class="btn-close" (click)="closeLightbox()" aria-label="Close image">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>

          @if (images.length > 1) {
            <button class="btn-nav btn-prev" (click)="prevImage()" aria-label="Previous image">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button class="btn-nav btn-next" (click)="nextImage()" aria-label="Next image">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          }

          <div class="lightbox-img-wrapper">
            <img [src]="currentImage.url" [alt]="currentImage.caption" class="lightbox-img" />
          </div>

          <div class="lightbox-caption-bar">
            <span class="phase-pill">{{ currentImage.phase | uppercase }}</span>
            <p class="caption-text">{{ currentImage.caption }}</p>
            <span class="counter-text">{{ currentIndex + 1 }} / {{ images.length }}</span>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .lightbox-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(5, 20, 38, 0.94);
      backdrop-filter: blur(10px);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      animation: fadeIn 0.25s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .lightbox-dialog {
      position: relative;
      max-width: 1000px;
      width: 100%;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      background: #0A2540;
      border-radius: var(--radius-lg);
      border: 1px solid rgba(0, 210, 255, 0.2);
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
      overflow: hidden;
    }

    .lightbox-img-wrapper {
      width: 100%;
      height: 60vh;
      background: #000;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }

    .btn-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(0, 0, 0, 0.6);
      color: #FFF;
      border: 1px solid rgba(255, 255, 255, 0.2);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      transition: background 0.2s ease;
      &:hover { background: #E11D48; }
    }

    .btn-nav {
      position: absolute;
      top: 45%;
      background: rgba(0, 0, 0, 0.6);
      color: #FFF;
      border: 1px solid rgba(255, 255, 255, 0.2);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      transition: all 0.2s ease;
      &:hover { background: var(--color-primary-600); }
      &.btn-prev { left: 1rem; }
      &.btn-next { right: 1rem; }
    }

    .lightbox-caption-bar {
      padding: 1rem 1.5rem;
      background: #071B2F;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      color: #FFF;

      .phase-pill {
        background: #0052CC;
        color: #FFF;
        font-size: 0.72rem;
        font-weight: 700;
        padding: 0.2rem 0.55rem;
        border-radius: 4px;
      }

      .caption-text {
        font-size: 0.9rem;
        color: #CBD5E1;
        margin-bottom: 0;
        flex: 1;
      }

      .counter-text {
        font-family: var(--font-mono);
        font-size: 0.85rem;
        color: #94A3B8;
      }
    }
  `]
})
export class LightboxComponent {
  @Input() images: GalleryImage[] = [];
  @Input() currentIndex: number = 0;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter<void>();

  get currentImage(): GalleryImage | undefined {
    return this.images[this.currentIndex];
  }

  closeLightbox() {
    this.close.emit();
  }

  prevImage() {
    if (this.images.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    }
  }

  nextImage() {
    if (this.images.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }
  }
}
