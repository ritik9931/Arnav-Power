import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SolarProject, UnifiedProjectItem } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() solarProject?: SolarProject;
  @Input() unifiedProject?: UnifiedProjectItem;

  get title(): string {
    return this.solarProject?.title || this.unifiedProject?.title || '';
  }

  get client(): string {
    return this.solarProject?.clientName || this.unifiedProject?.client || '';
  }

  get location(): string {
    return this.solarProject?.location || this.unifiedProject?.location || '';
  }

  get category(): string {
    return this.solarProject?.category || this.unifiedProject?.category || '';
  }

  get image(): string {
    return this.solarProject?.heroImage || this.unifiedProject?.image || '';
  }

  get link(): string {
    if (this.solarProject) {
      return `/solar-projects/${this.solarProject.slug}`;
    }
    return this.unifiedProject?.link || '/solar-projects';
  }

  get status(): string {
    return this.solarProject?.status || this.unifiedProject?.status || 'Completed';
  }

  get capacityOrScale(): string {
    if (this.solarProject) {
      return `${this.solarProject.capacityKw} kWp (${this.solarProject.panelsInstalled} Panels)`;
    }
    return this.unifiedProject?.capacityOrScale || '';
  }

  get isSolar(): boolean {
    return !!this.solarProject || this.unifiedProject?.domain === 'solar' || this.category.toLowerCase().includes('solar');
  }
}
