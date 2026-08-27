import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SolarService } from '../../core/services/solar.service';
import { SolarProject, GalleryImage } from '../../core/models/project.model';
import { LightboxComponent } from '../../shared/components/lightbox/lightbox.component';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterModule, LightboxComponent],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project = signal<SolarProject | undefined>(undefined);
  relatedProjects: SolarProject[] = [];

  isLightboxOpen = signal<boolean>(false);
  activeImageIndex = signal<number>(0);

  constructor(
    private route: ActivatedRoute,
    private solarService: SolarService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('id') || '';
      const found = this.solarService.getProjectBySlug(slug);
      this.project.set(found);

      if (found) {
        this.relatedProjects = this.solarService
          .getProjects()
          .filter(p => p.id !== found.id)
          .slice(0, 3);
      }
      // Scroll to top on navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  openLightbox(index: number) {
    this.activeImageIndex.set(index);
    this.isLightboxOpen.set(true);
  }

  closeLightbox() {
    this.isLightboxOpen.set(false);
  }
}
