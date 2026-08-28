import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { ProjectLocationService } from '../../../core/services/project-location.service';
import { MapProject, MapCategoryFilter } from '../../../core/models/map-project.model';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef<HTMLDivElement>;
  @Input() initialCenter: [number, number] = [21.106490, 80.154679];
  @Input() initialZoom: number = 9;
  @Input() showSidebar: boolean = true;
  @Input() filterDomain: MapCategoryFilter = 'all';

  private map: L.Map | null = null;
  private clusterGroup: any = null;
  private markerMap = new Map<string, L.Marker>();

  // Base tile layers (Google Maps in Leaflet)
  private currentTileLayer: L.TileLayer | null = null;
  private googleRoadmapLayer: L.TileLayer | null = null;
  private googleSatelliteLayer: L.TileLayer | null = null;
  private googleTerrainLayer: L.TileLayer | null = null;

  activeFilter = signal<MapCategoryFilter>('all');
  activeMapType = signal<'roadmap' | 'satellite' | 'terrain'>('roadmap');
  selectedItem = signal<MapProject | null>(null);
  filteredProjects = signal<MapProject[]>([]);
  
  categoryCounts = signal<{ all: number; solar: number; residential: number; gis: number }>({
    all: 0,
    solar: 0,
    residential: 0,
    gis: 0
  });

  constructor(private projectLocationService: ProjectLocationService) {}

  ngOnInit() {
    this.activeFilter.set(this.filterDomain);
    this.refreshData();
  }

  ngAfterViewInit() {
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

  private refreshData() {
    this.categoryCounts.set(this.projectLocationService.getCategoryCounts());
    this.filteredProjects.set(this.projectLocationService.getFilteredProjects(this.activeFilter()));
  }

  setFilter(filter: MapCategoryFilter) {
    this.activeFilter.set(filter);
    this.filteredProjects.set(this.projectLocationService.getFilteredProjects(filter));
    this.renderMarkersOnMap();
  }

  setMapType(type: 'roadmap' | 'satellite' | 'terrain') {
    this.activeMapType.set(type);
    if (!this.map) return;

    if (this.currentTileLayer) {
      this.map.removeLayer(this.currentTileLayer);
    }

    if (type === 'satellite' && this.googleSatelliteLayer) {
      this.currentTileLayer = this.googleSatelliteLayer;
    } else if (type === 'terrain' && this.googleTerrainLayer) {
      this.currentTileLayer = this.googleTerrainLayer;
    } else if (this.googleRoadmapLayer) {
      this.currentTileLayer = this.googleRoadmapLayer;
    }

    if (this.currentTileLayer) {
      this.currentTileLayer.addTo(this.map);
      this.currentTileLayer.bringToBack();
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

    // 1. Google Maps Roadmap Layer (Standard crisp Google Streets)
    this.googleRoadmapLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; <a href="https://maps.google.com" target="_blank">Google Maps</a>'
    });

    // 2. Google Maps Satellite Hybrid Layer (High-res satellite + road overlay)
    this.googleSatelliteLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; <a href="https://maps.google.com" target="_blank">Google Maps Satellite</a>'
    });

    // 3. Google Maps Terrain Layer
    this.googleTerrainLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; <a href="https://maps.google.com" target="_blank">Google Maps Terrain</a>'
    });

    // Add initial layer (Google Roadmap)
    this.currentTileLayer = this.googleRoadmapLayer;
    this.currentTileLayer.addTo(this.map);

    // Initialize MarkerClusterGroup with spiderfying and custom cluster icon
    this.clusterGroup = (L as any).markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 35,
      spiderfyOnMaxZoom: true,
      spiderfyDistanceMultiplier: 1.6,
      zoomToBoundsOnClick: true,
      disableClusteringAtZoom: 17,
      iconCreateFunction: (cluster: any) => {
        const count = cluster.getChildCount();
        return L.divIcon({
          html: `<div class="custom-solar-cluster">
                   <span class="cluster-icon">☀</span>
                   <span class="cluster-num">${count}</span>
                 </div>`,
          className: 'custom-cluster-wrapper',
          iconSize: [42, 42],
          iconAnchor: [21, 21]
        });
      }
    });

    this.map.addLayer(this.clusterGroup);
    this.renderMarkersOnMap();

    setTimeout(() => {
      this.map?.invalidateSize();
    }, 300);
  }

  private renderMarkersOnMap() {
    if (!this.map || !this.clusterGroup) return;

    this.clusterGroup.clearLayers();
    this.markerMap.clear();

    const bounds: L.LatLngExpression[] = [];
    const projects = this.filteredProjects();

    projects.forEach(item => {
      const latLng: [number, number] = [item.lat, item.lng];
      bounds.push(latLng);

      const customIcon = this.createCustomIcon(item.category, item.isHq);
      const marker = L.marker(latLng, { icon: customIcon });

      const popupHtml = this.buildPopupHtml(item);
      marker.bindPopup(popupHtml, { maxWidth: 280, className: 'custom-leaflet-popup' });

      marker.on('click', () => {
        this.selectedItem.set(item);
      });

      this.markerMap.set(item.id, marker);
      this.clusterGroup.addLayer(marker);
    });

    // Smart bounds fitting
    if (bounds.length > 0 && this.map) {
      this.map.fitBounds(L.latLngBounds(bounds), { padding: [45, 45], maxZoom: 14 });
    }
  }

  private buildPopupHtml(item: MapProject): string {
    const isResidential = item.category === 'residential';
    const isHq = item.isHq;
    const isSolar = item.category === 'solar';

    let badgeClass = 'badge-gis';
    let badgeText = item.projectType;
    let icon = '🛰️';

    if (isHq) {
      badgeClass = 'badge-hq';
      icon = '🏢';
    } else if (isResidential) {
      badgeClass = 'badge-residential';
      icon = '☀';
      badgeText = 'RESIDENTIAL SOLAR INSTALLATION';
    } else if (isSolar) {
      badgeClass = 'badge-solar';
      icon = '☀️';
    }

    return `
      <div class="map-popup-card">
        <div class="popup-badge-row">
          <span class="popup-badge ${badgeClass}">${icon} ${badgeText}</span>
          <span class="popup-status">✓ ${item.status}</span>
        </div>
        
        <h4 class="popup-title">${item.projectName}</h4>
        <div class="popup-company">${item.companyName}</div>
        <div class="popup-location">📍 ${item.location}</div>
        
        ${item.capacityOrScale ? `<div class="popup-metric">⚡ ${item.capacityOrScale}</div>` : ''}

        <div class="popup-coords font-mono-num">
          ${item.lat.toFixed(6)}° N, ${item.lng.toFixed(6)}° E
        </div>

        ${
          item.link
            ? `<a href="${item.link}" class="popup-btn">View Installation Details →</a>`
            : ''
        }
      </div>
    `;
  }

  private createCustomIcon(category: 'solar' | 'residential' | 'gis' | 'hq', isHq?: boolean): L.DivIcon {
    let pinClass = 'pin-gis';
    let symbolSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>`;

    if (isHq) {
      pinClass = 'pin-hq';
      symbolSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
    } else if (category === 'residential') {
      pinClass = 'pin-residential';
      symbolSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/></svg>`;
    } else if (category === 'solar') {
      pinClass = 'pin-solar';
      symbolSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/></svg>`;
    }

    return L.divIcon({
      className: 'custom-map-pin-wrapper',
      html: `<div class="custom-map-pin ${pinClass}">${symbolSvg}</div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18]
    });
  }

  focusMarker(item: MapProject) {
    this.selectedItem.set(item);
    const marker = this.markerMap.get(item.id);

    if (marker && this.clusterGroup && this.map) {
      this.clusterGroup.zoomToShowLayer(marker, () => {
        marker.openPopup();
      });
    } else if (this.map) {
      this.map.flyTo([item.lat, item.lng], 15, { duration: 1.2 });
    }
  }

  resetView() {
    this.setFilter('all');
    if (this.map) {
      this.map.flyTo(this.initialCenter, this.initialZoom, { duration: 1.2 });
    }
    this.selectedItem.set(null);
  }
}
