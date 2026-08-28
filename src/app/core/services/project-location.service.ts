import { Injectable } from '@angular/core';
import { MapProject, MapCategoryFilter } from '../models/map-project.model';
import { RESIDENTIAL_SOLAR_INSTALLATIONS } from '../data/residential-solar-locations.data';
import { SolarService } from './solar.service';
import { ProjectService } from './project.service';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectLocationService {
  constructor(
    private solarService: SolarService,
    private projectService: ProjectService,
    private contactService: ContactService
  ) {}

  getAllMapProjects(): MapProject[] {
    const list: MapProject[] = [];

    // 1. Corporate HQ & Regional Branch
    const hq = this.contactService.companyDetails;
    list.push({
      id: 'hq-gondia',
      projectName: `${hq.name} (Corporate Office)`,
      companyName: hq.name,
      projectType: 'Corporate Address (Main Branch)',
      category: 'hq',
      location: `${hq.addressLine1}, ${hq.addressLine2}`,
      capacityOrScale: 'Corporate Head Office',
      status: 'Active Headquarters',
      lat: hq.coordinates.latitude,
      lng: hq.coordinates.longitude,
      image: 'assets/images/hero/about-team.jpg',
      link: '/contact',
      isHq: true
    });

    list.push({
      id: 'branch-nagpur',
      projectName: `${hq.name} (Regional Branch)`,
      companyName: hq.name,
      projectType: 'Regional Engineering & GIS Lab',
      category: 'hq',
      location: `${hq.branchAddressLine1}, ${hq.branchAddressLine2}`,
      capacityOrScale: 'Operations & Survey Field Teams',
      status: 'Active Operations',
      lat: hq.nagpurCoordinates.latitude,
      lng: hq.nagpurCoordinates.longitude,
      image: 'assets/images/hero/gis-survey-hero.jpg',
      link: '/contact',
      isHq: true
    });

    // 2. Commercial / Industrial Solar Turnkey EPC Plants
    const commercialSolar = this.solarService.getProjects().map(p => ({
      id: p.id,
      projectName: p.title,
      companyName: 'Arnav Power Solution Services',
      projectType: `${p.category} Solar Installation`,
      category: 'solar' as const,
      location: p.location,
      capacityOrScale: `${p.capacityKw} kWp (${p.panelsInstalled} Panels)`,
      status: p.status,
      lat: p.coordinates.lat,
      lng: p.coordinates.lng,
      image: p.heroImage,
      link: `/solar-projects/${p.slug}`
    }));
    list.push(...commercialSolar);

    // 3. Real Residential Solar Installations (51 locations in Maharashtra)
    list.push(...RESIDENTIAL_SOLAR_INSTALLATIONS);

    // 4. GIS & Survey Projects
    const gisProjects = this.projectService.getGisProjects().map(g => ({
      id: g.id,
      projectName: g.title,
      companyName: 'Arnav Power Solution Services',
      projectType: g.category,
      category: 'gis' as const,
      location: g.location,
      capacityOrScale: `${g.areaCoverageSqKm} km² (${g.surveyPointsCollected.toLocaleString()} Points)`,
      status: g.status,
      lat: g.coordinates.lat,
      lng: g.coordinates.lng,
      image: g.image,
      link: '/gis-survey'
    }));
    list.push(...gisProjects);

    return list;
  }

  getFilteredProjects(filter: MapCategoryFilter): MapProject[] {
    const all = this.getAllMapProjects();
    if (filter === 'all') {
      return all;
    }
    if (filter === 'residential') {
      return all.filter(p => p.category === 'residential');
    }
    if (filter === 'solar') {
      return all.filter(p => p.category === 'solar' || p.category === 'residential');
    }
    if (filter === 'gis') {
      return all.filter(p => p.category === 'gis' || p.category === 'hq');
    }
    return all;
  }

  getCategoryCounts(): { all: number; solar: number; residential: number; gis: number } {
    const all = this.getAllMapProjects();
    const residential = all.filter(p => p.category === 'residential').length;
    const solar = all.filter(p => p.category === 'solar' || p.category === 'residential').length;
    const gis = all.filter(p => p.category === 'gis' || p.category === 'hq').length;

    return {
      all: all.length,
      solar,
      residential,
      gis
    };
  }
}
