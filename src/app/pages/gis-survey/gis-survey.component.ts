import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GisService } from '../../core/services/gis.service';
import { ServiceItem, GisTechnology, ProcessStep } from '../../core/models/service.model';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';

@Component({
  selector: 'app-gis-survey',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SectionHeaderComponent,
    ServiceCardComponent
  ],
  templateUrl: './gis-survey.component.html',
  styleUrls: ['./gis-survey.component.scss']
})
export class GisSurveyComponent implements OnInit {
  services: ServiceItem[] = [];
  technologies: GisTechnology[] = [];
  processSteps: ProcessStep[] = [];

  deliverables = [
    {
      title: 'ESRI Shapefiles & GeoJSON',
      desc: 'Topologically clean spatial vector datasets with complete NRDMS attribute schemas.',
      icon: 'layers'
    },
    {
      title: 'AutoCAD DWG / DXF Plans',
      desc: 'Layer-separated architectural contour and layout drawings ready for Civil 3D workflows.',
      icon: 'file-text'
    },
    {
      title: 'High-Res Orthomosaics',
      desc: 'Sub-3cm GSD geotagged aerial mosaics with geodetic GCP ground control.',
      icon: 'image'
    },
    {
      title: '3D DEM / DTM Surface Models',
      desc: 'Digital Elevation Models for hydraulic drainage, slope analysis, and cut/fill earthworks.',
      icon: 'box'
    },
    {
      title: 'Subsurface Utility Engineering (SUE)',
      desc: 'GPR quality level A & B depth alignment maps of buried electrical & water infrastructure.',
      icon: 'activity'
    },
    {
      title: 'Interactive Web GIS Portals',
      desc: 'Custom cloud map dashboards with role-based access for municipal planning.',
      icon: 'globe'
    }
  ];

  constructor(private gisService: GisService) {}

  ngOnInit() {
    this.services = this.gisService.getServices();
    this.technologies = this.gisService.getTechnologies();
    this.processSteps = this.gisService.getProcessSteps();
  }
}
