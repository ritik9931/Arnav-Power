import { Component, OnInit, signal, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GisService } from '../../core/services/gis.service';
import { SolarService } from '../../core/services/solar.service';
import { ProjectService } from '../../core/services/project.service';
import { ClientService } from '../../core/services/client.service';
import { ServiceItem, GisTechnology, ProcessStep } from '../../core/models/service.model';
import { UnifiedProjectItem } from '../../core/models/project.model';
import { ClientItem, StatCounterItem } from '../../core/models/client.model';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { StatsCounterComponent } from '../../shared/components/stats-counter/stats-counter.component';
import { LeafletMapComponent } from '../../shared/components/leaflet-map/leaflet-map.component';
import { SolarCalculatorComponent } from '../../shared/components/solar-calculator/solar-calculator.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SectionHeaderComponent,
    ProjectCardComponent,
    StatsCounterComponent,
    LeafletMapComponent,
    SolarCalculatorComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('solarCarousel', { static: false }) solarCarousel?: ElementRef<HTMLDivElement>;
  @ViewChild('gisCarousel', { static: false }) gisCarousel?: ElementRef<HTMLDivElement>;

  gisServices: ServiceItem[] = [];
  solarServices: ServiceItem[] = [];
  gisTechnologies: GisTechnology[] = [];
  
  solarFeaturedProjects: UnifiedProjectItem[] = [];
  gisFeaturedProjects: UnifiedProjectItem[] = [];
  
  stats: StatCounterItem[] = [];
  clients: ClientItem[] = [];

  activeProcessDomain = signal<'gis' | 'solar'>('solar');
  gisProcessSteps: ProcessStep[] = [];
  solarProcessSteps: ProcessStep[] = [];

  constructor(
    private gisService: GisService,
    private solarService: SolarService,
    private projectService: ProjectService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    this.gisServices = this.gisService.getServices();
    this.solarServices = this.solarService.getServices();
    this.gisTechnologies = this.gisService.getTechnologies();
    
    // Solar projects for dedicated Solar carousel
    this.solarFeaturedProjects = this.solarService.getProjects().map(s => ({
      id: s.id,
      slug: s.slug,
      domain: 'solar' as const,
      title: s.title,
      category: `${s.category} Solar Plant`,
      client: s.clientName,
      location: s.location,
      capacityOrScale: `${s.capacityKw} kWp (${s.panelsInstalled} Panels)`,
      status: s.status,
      image: s.heroImage,
      description: s.description,
      link: `/solar-projects/${s.slug}`
    }));

    // GIS & Survey projects for dedicated Survey carousel
    this.gisFeaturedProjects = this.projectService.getGisProjects().map(g => ({
      id: g.id,
      slug: g.slug,
      domain: 'gis' as const,
      title: g.title,
      category: g.category,
      client: g.clientName,
      location: g.location,
      capacityOrScale: `${g.areaCoverageSqKm} km² (${g.surveyPointsCollected.toLocaleString()} Points)`,
      status: g.status,
      image: g.image,
      description: g.description,
      link: '/gis-survey'
    }));

    this.stats = this.clientService.getStats();
    this.clients = this.clientService.getClients();
    this.gisProcessSteps = this.gisService.getProcessSteps();
    this.solarProcessSteps = this.solarService.getProcessSteps();
  }

  scrollSolarCarousel(direction: -1 | 1) {
    if (!this.solarCarousel?.nativeElement) return;
    const container = this.solarCarousel.nativeElement;
    const scrollAmount = container.clientWidth * 0.85;
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }

  scrollGisCarousel(direction: -1 | 1) {
    if (!this.gisCarousel?.nativeElement) return;
    const container = this.gisCarousel.nativeElement;
    const scrollAmount = container.clientWidth * 0.85;
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }

  setProcessDomain(domain: 'gis' | 'solar') {
    this.activeProcessDomain.set(domain);
  }
}
