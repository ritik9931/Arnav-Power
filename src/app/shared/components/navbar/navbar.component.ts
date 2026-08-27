import { Component, HostListener, signal, ViewChild, ElementRef, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  @ViewChild('topbarRef', { static: false }) topbarRef?: ElementRef<HTMLDivElement>;
  @ViewChild('navbarRef', { static: false }) navbarRef?: ElementRef<HTMLElement>;

  isNavbarFixed = signal(false);
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  topbarHeight = signal(38);
  navbarHeight = signal(74);

  navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'About Us', path: '/about' },
    { label: 'GIS & Survey', path: '/gis-survey' },
    { label: 'Solar Solutions', path: '/solar-solutions' },
    { label: 'Projects', path: '/solar-projects' },
    { label: 'Clients', path: '/clients' },
    { label: 'Contact Us', path: '/contact' }
  ];

  ngAfterViewInit() {
    this.measureHeights();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.measureHeights();
    this.checkScrollPosition();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.checkScrollPosition();
  }

  private measureHeights() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.topbarRef?.nativeElement) {
      const tbH = this.topbarRef.nativeElement.offsetHeight;
      if (tbH > 0) this.topbarHeight.set(tbH);
    }
    if (this.navbarRef?.nativeElement) {
      const nbH = this.navbarRef.nativeElement.offsetHeight;
      if (nbH > 0) this.navbarHeight.set(nbH);
    }
  }

  private checkScrollPosition() {
    if (!isPlatformBrowser(this.platformId)) return;
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    const threshold = this.topbarHeight() > 0 ? this.topbarHeight() : 38;

    // When scrolling past topbar, fix the navbar at top: 0 permanently
    this.isNavbarFixed.set(scrollY >= threshold);
    this.isScrolled.set(scrollY > threshold + 10);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(val => !val);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
