import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as L from 'leaflet';
import { SolarService } from '../../../core/services/solar.service';
import { ProjectService } from '../../../core/services/project.service';
import { ContactService } from '../../../core/services/contact.service';

export interface MapMarkerItem {
  id: string;
  title: string;
  category: string;
  domain: 'hq' | 'solar' | 'gis';
  client: string;
  location: string;
  capacityOrScale: string;
  coordinates: { lat: number; lng: number };
  image: string;
  link?: string;
  isHq?: boolean;
}

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef<HTMLDivElement>;
  @Input() initialCenter: [number, number] = [21.169158, 79.042789];
  @Input() initialZoom: number = 8;
  @Input() showSidebar: boolean = true;
  @Input() filterDomain: 'all' | 'solar' | 'gis' = 'all';

  private map: L.Map | null = null;
  private markersLayer: L.LayerGroup = L.layerGroup();

  activeFilter = signal<'all' | 'solar' | 'gis'>('all');
  selectedItem = signal<MapMarkerItem | null>(null);
  allMarkers: MapMarkerItem[] = [];
  filteredMarkers = signal<MapMarkerItem[]>([]);

  constructor(
    private solarService: SolarService,
    private projectService: ProjectService,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.activeFilter.set(this.filterDomain);
    this.prepareMarkerData();
  }

  ngAfterViewInit() {
    // Delay slightly to ensure container has size
    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
  }

  private prepareMarkerData() {
    const list: MapMarkerItem[] = [];

    // 1. Corporate HQ (Wadegaon, Sadak Arjuni, Gondia)
    const hq = this.contactService.companyDetails;
    list.push({
      id: 'hq-gondia',
      title: `${hq.name} (Corporate Office)`,
      category: 'Corporate Address (Main Branch)',
      domain: 'hq',
      client: 'Arnav Power Solution & Services',
      location: `${hq.addressLine1}, ${hq.addressLine2}`,
      capacityOrScale: 'Corporate Head Office & Central Management',
      coordinates: { lat: hq.coordinates.latitude, lng: hq.coordinates.longitude },
      image: 'assets/images/hero/about-team.jpg',
      link: '/contact',
      isHq: true
    });

    // 2. Regional Engineering & GIS Operations (Nagpur)
    list.push({
      id: 'branch-nagpur',
      title: `${hq.name} (Regional Branch)`,
      category: 'Regional Engineering & GIS Lab',
      domain: 'hq',
      client: 'Arnav Power Solution & Services',
      location: `${hq.branchAddressLine1}, ${hq.branchAddressLine2}`,
      capacityOrScale: 'Regional Operations & Survey Field Teams',
      coordinates: { lat: hq.nagpurCoordinates.latitude, lng: hq.nagpurCoordinates.longitude },
      image: 'assets/images/hero/gis-survey-hero.jpg',
      link: '/contact',
      isHq: true
    });

    // 2. Solar Projects
    this.solarService.getProjects().forEach(p => {
      list.push({
        id: p.id,
        title: p.title,
        category: `${p.category} Solar Installation`,
        domain: 'solar',
        client: p.clientName,
        location: p.location,
        capacityOrScale: `${p.capacityKw} kWp • ${p.panelsInstalled} Modules`,
        coordinates: p.coordinates,
        image: p.heroImage,
        link: `/solar-projects/${p.slug}`
      });
    });

    // 3. GIS Projects
    this.projectService.getGisProjects().forEach(g => {
      list.push({
        id: g.id,
        title: g.title,
        category: g.category,
        domain: 'gis',
        client: g.clientName,
        location: g.location,
        capacityOrScale: `${g.areaCoverageSqKm} km² • ${g.surveyPointsCollected.toLocaleString()} Points`,
        coordinates: g.coordinates,
        image: g.image,
        link: '/gis-survey'
      });
    });

    this.allMarkers = list;
    this.applyFilter(this.activeFilter());
  }

  setFilter(filter: 'all' | 'solar' | 'gis') {
    this.activeFilter.set(filter);
    this.applyFilter(filter);
    this.renderMarkersOnMap();
  }

  private applyFilter(filter: 'all' | 'solar' | 'gis') {
    if (filter === 'all') {
      this.filteredMarkers.set(this.allMarkers);
    } else if (filter === 'solar') {
      this.filteredMarkers.set(this.allMarkers.filter(m => m.domain === 'solar' || m.domain === 'hq'));
    } else if (filter === 'gis') {
      this.filteredMarkers.set(this.allMarkers.filter(m => m.domain === 'gis' || m.domain === 'hq'));
    }
  }

  private initMap() {
    if (!this.mapContainer || this.map) return;

    this.map = L.map(this.mapContainer.nativeElement, {
      center: this.initialCenter,
      zoom: this.initialZoom,
      zoomControl: true,
      scrollWheelZoom: false
    });

    // Clean, high-tech OpenStreetMap tile layer (CartoDB Positron style tiles)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.map);

    this.markersLayer.addTo(this.map);
    this.renderMarkersOnMap();

    // Invalidate size on resize
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 400);
  }

  private renderMarkersOnMap() {
    if (!this.map) return;
    this.markersLayer.clearLayers();

    const bounds: L.LatLngExpression[] = [];

    this.filteredMarkers().forEach(item => {
      const latLng: [number, number] = [item.coordinates.lat, item.coordinates.lng];
      bounds.push(latLng);

      const customIcon = this.createCustomIcon(item.domain, item.isHq);
      const marker = L.marker(latLng, { icon: customIcon });

      const popupHtml = `
        <div style="font-family: 'Inter', sans-serif; width: 230px;">
          <div style="height: 100px; overflow: hidden; border-radius: 8px; margin-bottom: 8px; position: relative;">
            <img src="${item.image}" style="width: 100%; height: 100%; object-fit: cover;" />
            <span style="position: absolute; top: 6px; left: 6px; background: rgba(10,37,64,0.85); color: #FFF; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">${item.category}</span>
          </div>
          <h4 style="font-size: 13px; font-weight: 700; color: #0A2540; margin: 0 0 4px 0; line-height: 1.3;">${item.title}</h4>
          <p style="font-size: 11px; color: #64748B; margin: 0 0 6px 0;">📍 ${item.location}</p>
          <div style="background: #F1F5F9; padding: 4px 6px; border-radius: 4px; font-size: 11px; font-weight: 600; color: #0052CC; margin-bottom: 8px;">
            ⚡ ${item.capacityOrScale}
          </div>
          ${item.link ? `<a href="${item.link}" style="display: block; text-align: center; background: #0052CC; color: #FFF; font-size: 11px; font-weight: 600; padding: 6px 10px; border-radius: 6px; text-decoration: none;">View Details →</a>` : ''}
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 260 });
      marker.on('click', () => {
        this.selectedItem.set(item);
      });

      this.markersLayer.addLayer(marker);
    });

    if (bounds.length > 0 && this.map) {
      this.map.fitBounds(L.latLngBounds(bounds), { padding: [40, 40], maxZoom: 12 });
    }
  }

  private createCustomIcon(domain: 'hq' | 'solar' | 'gis', isHq?: boolean): L.DivIcon {
    let iconClass = 'pin-gis';
    let symbolSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>`;

    if (isHq) {
      iconClass = 'pin-hq';
      symbolSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
    } else if (domain === 'solar') {
      iconClass = 'pin-solar';
      symbolSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M2 12h2"/><path d="M20 12h2"/></svg>`;
    }

    return L.divIcon({
      className: 'custom-map-pin-container',
      html: `<div class="custom-map-pin ${iconClass}">${symbolSvg}</div>`,
      iconSize: [38, 38],
      iconAnchor: [19, 19],
      popupAnchor: [0, -20]
    });
  }

  focusMarker(item: MapMarkerItem) {
    this.selectedItem.set(item);
    if (this.map) {
      this.map.flyTo([item.coordinates.lat, item.coordinates.lng], 13, { duration: 1.2 });
    }
  }

  resetView() {
    if (this.map) {
      this.map.flyTo(this.initialCenter, this.initialZoom, { duration: 1.2 });
    }
    this.selectedItem.set(null);
  }
}
