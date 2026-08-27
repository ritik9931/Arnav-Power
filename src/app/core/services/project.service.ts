import { Injectable } from '@angular/core';
import { UnifiedProjectItem, GisProject } from '../models/project.model';
import { SolarService } from './solar.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private gisProjects: GisProject[] = [
    {
      id: 'nagpur-smart-gis',
      slug: 'nagpur-smart-gis',
      title: 'Nagpur Municipal Smart Utility & GIS Mapping',
      clientName: 'Nagpur Smart City & Urban Development',
      category: 'Utility Survey',
      location: 'Civil Lines, Dharampeth & West Nagpur Zones',
      city: 'Nagpur',
      state: 'Maharashtra',
      coordinates: { lat: 21.1458, lng: 79.0882 },
      surveyPointsCollected: 145000,
      areaCoverageSqKm: 82,
      status: 'Completed',
      completionDate: 'November 2024',
      description: 'Comprehensive underground and overhead utility mapping including 33kV/11kV electrical networks, water distribution pipelines, and storm water drains using RTK GNSS and GPR.',
      image: 'assets/images/projects/nagpur-smart-gis.jpg',
      technologiesUsed: ['Ground Penetrating Radar', 'Trimble RTK DGPS', 'ArcGIS Utility Network']
    },
    {
      id: 'midc-cadastral-boundary',
      slug: 'midc-cadastral-boundary',
      title: 'MIDC Industrial Estate Cadastral & Landbase Survey',
      clientName: 'Maharashtra Industrial Development Corp (MIDC)',
      category: 'Landbase Survey',
      location: 'Butibori & Hingna Industrial Zones, Nagpur',
      city: 'Nagpur',
      state: 'Maharashtra',
      coordinates: { lat: 21.0116, lng: 78.9664 },
      surveyPointsCollected: 88000,
      areaCoverageSqKm: 45,
      status: 'Completed',
      completionDate: 'September 2024',
      description: 'High-precision geodetic boundary demarcation and 3D topographic contour modeling for industrial plot allocation, road corridors, and stormwater drainage planning.',
      image: 'assets/images/projects/midc-cadastral.jpg',
      technologiesUsed: ['Leica Total Station', 'Dual-Frequency GNSS', 'AutoCAD Civil 3D']
    },
    {
      id: 'state-discom-consumer-index',
      slug: 'state-discom-consumer-index',
      title: 'State DISCOM Consumer Indexing & Household Survey',
      clientName: 'Maharashtra State Electricity Distribution Co. Ltd.',
      category: 'Household Survey',
      location: 'Nagpur & Wardha Distribution Circles',
      city: 'Nagpur',
      state: 'Maharashtra',
      coordinates: { lat: 20.7453, lng: 78.6022 },
      surveyPointsCollected: 210000,
      areaCoverageSqKm: 160,
      status: 'Completed',
      completionDate: 'January 2025',
      description: 'Door-to-door electrical consumer geocoding, pole-to-meter tracing, and transformer load attribution across 120,000+ consumer households using mobile GIS tablets.',
      image: 'assets/images/projects/discom-indexing.jpg',
      technologiesUsed: ['Mobile GIS Collector', 'Real-time QC Cloud', 'Barcode Scanning']
    },
    {
      id: 'expressway-corridor-topography',
      slug: 'expressway-corridor-topography',
      title: 'Samruddhi Mahamarg Feeder Corridor Drone LiDAR Survey',
      clientName: 'Maharashtra State Road Development Corp (MSRDC)',
      category: 'GIS Survey',
      location: 'Nagpur - Wardha Corridor Interchange',
      city: 'Wardha',
      state: 'Maharashtra',
      coordinates: { lat: 20.9167, lng: 78.75 },
      surveyPointsCollected: 350000,
      areaCoverageSqKm: 110,
      status: 'Completed',
      completionDate: 'July 2024',
      description: 'High-density drone photogrammetry and topographic terrain elevation modeling for road widening, interchange geometry, and hydraulic runoff analysis.',
      image: 'assets/images/projects/expressway-lidar.jpg',
      technologiesUsed: ['UAV LiDAR', 'RTK Rover', 'Global Mapper 3D']
    }
  ];

  constructor(private solarService: SolarService) {}

  getGisProjects(): GisProject[] {
    return this.gisProjects;
  }

  getFeaturedProjects(): UnifiedProjectItem[] {
    const solarList = this.solarService.getProjects().slice(0, 4).map(s => ({
      id: s.id,
      slug: s.slug,
      domain: 'solar' as const,
      title: s.title,
      category: 'Solar Installation',
      client: s.clientName,
      location: s.location,
      capacityOrScale: `${s.capacityKw} kWp (${s.panelsInstalled} Panels)`,
      status: s.status,
      image: s.heroImage,
      description: s.description,
      link: `/solar-projects/${s.slug}`
    }));

    const gisList = this.gisProjects.slice(0, 4).map(g => ({
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

    return [...solarList, ...gisList];
  }
}
