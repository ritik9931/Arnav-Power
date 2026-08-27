import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SolarService } from '../../core/services/solar.service';
import { SolarProject, SolarCategory } from '../../core/models/project.model';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { LeafletMapComponent } from '../../shared/components/leaflet-map/leaflet-map.component';

@Component({
  selector: 'app-solar-projects',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SectionHeaderComponent,
    ProjectCardComponent,
    LeafletMapComponent
  ],
  templateUrl: './solar-projects.component.html',
  styleUrls: ['./solar-projects.component.scss']
})
export class SolarProjectsComponent implements OnInit {
  allProjects: SolarProject[] = [];
  selectedCategory = signal<string>('All');
  searchQuery = signal<string>('');

  filteredProjects = computed(() => {
    let list = this.allProjects;
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();

    if (cat !== 'All') {
      list = list.filter(p => p.category.toLowerCase() === cat.toLowerCase());
    }

    if (query) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.clientName.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.city.toLowerCase().includes(query) ||
        p.capacityKw.toString().includes(query)
      );
    }

    return list;
  });

  constructor(private solarService: SolarService) {}

  ngOnInit() {
    this.allProjects = this.solarService.getProjects();
  }

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
