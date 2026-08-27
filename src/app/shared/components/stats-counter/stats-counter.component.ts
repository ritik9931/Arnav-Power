import { Component, Input, OnInit, ElementRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-counter.component.html',
  styleUrls: ['./stats-counter.component.scss']
})
export class StatsCounterComponent implements OnInit {
  @Input({ required: true }) targetValue: number = 0;
  @Input() suffix: string = '';
  @Input() prefix: string = '';
  @Input() label: string = '';
  @Input() sublabel: string = '';
  @Input() icon: string = 'check';
  @Input() domain: 'gis' | 'solar' | 'general' = 'general';
  @Input() durationMs: number = 1800;

  displayValue = signal<string>('0');
  private hasAnimated = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            this.animateNumber();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });

      observer.observe(this.el.nativeElement);
    } else {
      this.displayValue.set(this.formatNumber(this.targetValue));
    }
  }

  private animateNumber() {
    const startTime = performance.now();
    const isFloat = this.targetValue % 1 !== 0;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.durationMs, 1);
      // easeOutCubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = easeProgress * this.targetValue;

      if (isFloat) {
        this.displayValue.set(current.toFixed(1));
      } else {
        this.displayValue.set(Math.floor(current).toLocaleString());
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        this.displayValue.set(this.formatNumber(this.targetValue));
      }
    };

    requestAnimationFrame(step);
  }

  private formatNumber(val: number): string {
    if (val % 1 !== 0) return val.toFixed(1);
    return val.toLocaleString();
  }
}
