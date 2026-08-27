import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  navLinks = [
    { label: 'Home', path: '/home' },
    { label: 'About Us', path: '/about' },
    { label: 'GIS & Survey', path: '/gis-survey' },
    { label: 'Solar Solutions', path: '/solar-solutions' },
    { label: 'Projects', path: '/solar-projects' },
    { label: 'Clients', path: '/clients' },
    { label: 'Contact Us', path: '/contact' }
  ];

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 25);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(val => !val);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
