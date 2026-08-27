import { Injectable } from '@angular/core';
import { ServiceItem, GisTechnology, ProcessStep } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class GisService {
  private servicesList: ServiceItem[] = [
    {
      id: 'gis-survey',
      slug: 'gis-survey',
      category: 'gis',
      title: 'GIS Survey & Geospatial Analysis',
      tagline: 'Precision Spatial Intelligence & Vector Mapping',
      shortDesc: 'Professional Geographic Information System solutions for accurate spatial data collection, mapping, visualization and analysis across urban and regional landscapes.',
      fullDesc: 'Our GIS Survey service provides end-to-end spatial data engineering from satellite photogrammetry and field ground control to topological cleaning, database schema structuring, and interactive GIS web portal integration. We assist municipal corporations, infrastructure planners, and smart city authorities in transforming raw field coordinates into actionable enterprise GIS layers.',
      icon: 'map',
      image: 'assets/images/gis/gis-survey.jpg',
      features: [
        'Differential GPS (DGPS) & RTK Field Spatial Data Capture',
        'Topological Validation & Multi-layer GIS Database Modeling',
        'Georeferencing of High-Resolution Satellite & Aerial Imagery',
        'Spatial Database Management (PostGIS, GeoServer, QGIS, ArcGIS)',
        '3D Elevation Models (DEM/DTM) & Contour Generation'
      ],
      deliverables: [
        'Clean ESRI Shapefiles / GeoJSON Data Layers',
        'High-Resolution Geotiff Orthomosaics',
        'Spatial Attribute Metadata compliant with NRDMS Standards',
        'Web GIS Map Dashboard & API Endpoints'
      ],
      technologies: ['DGPS Trimble RTK', 'ArcGIS Enterprise', 'QGIS Pro', 'PostgreSQL/PostGIS', 'Drone Photogrammetry'],
      metrics: [
        { label: 'Positional Accuracy', value: '< 2.5 cm' },
        { label: 'Points Mapped', value: '1.2M+' },
        { label: 'GIS Layers Created', value: '350+' }
      ]
    },
    {
      id: 'landbase-survey',
      slug: 'landbase-survey',
      category: 'gis',
      title: 'Landbase & Topographic Survey',
      tagline: 'Millimeter-Accurate Land Surface & Elevation Profiling',
      shortDesc: 'Accurate land base surveys for master planning, highway corridors, infrastructure development, land management, and spatial feasibility analysis.',
      fullDesc: 'We execute high-precision landbase and topographic surveys using advanced Total Stations and Dual-Frequency GNSS receivers. Our surveys capture natural terrain features, elevation contours, right-of-way (RoW) alignments, water bodies, and man-made structures with absolute geodetic precision.',
      icon: 'mountain',
      image: 'assets/images/gis/land-survey.jpg',
      features: [
        'Total Station & GNSS Boundary Demarcation',
        'Digital Elevation Model (DEM) and 0.5m Contour Profiling',
        'Right-of-Way (RoW) & Road Corridor Topography',
        'Bench Mark Pillar Construction & Geodetic Network Tie-in',
        'Volume Calculation for Cut and Fill Earthworks'
      ],
      deliverables: [
        'AutoCAD DWG/DXF Contour & Topographic Plans',
        'Cross-Section & Longitudinal Profile Sheets',
        'Bench Mark Level Registers & Coordinate Schedules',
        '3D Point Cloud Ground Models'
      ],
      technologies: ['Leica / Topcon Total Station', 'Dual-Frequency GNSS', 'AutoCAD Civil 3D', 'Global Mapper'],
      metrics: [
        { label: 'Survey Speed', value: '15+ Ha / Day' },
        { label: 'Vertical Precision', value: '± 1 mm' },
        { label: 'Covered Area', value: '8,500+ Acres' }
      ]
    },
    {
      id: 'property-survey',
      slug: 'property-survey',
      category: 'gis',
      title: 'Property & Cadastral Survey',
      tagline: 'Legal Demarcation, Boundary Mapping & Title Verification',
      shortDesc: 'Detailed property boundary identification, plot demarcation, spatial documentation, and cadastral map digitization for real estate and municipal records.',
      fullDesc: 'Our property survey services integrate cadastral revenue village maps with modern satellite basemaps and on-ground DGPS boundary stones. We empower developers, industrial zones (MIDC), revenue departments, and private landowners with undisputed, legally verified spatial boundaries and property tax digitization.',
      icon: 'building',
      image: 'assets/images/gis/property-survey.jpg',
      features: [
        'Cadastral Revenue Map Superimposition & Georeferencing',
        'Private Estate & Commercial Plot Boundary Demarcation',
        'Encroachment Detection & Variance Analysis',
        'Municipal Property Tax Spatial ID (PID) Tagging',
        'Layout Approval & Sub-division Mapping'
      ],
      deliverables: [
        'Legal Demarcation Plans with True North & Coordinates',
        'Encroachment Overlay Reports',
        'Revenue Map Matching Sheets (Khasra/Gat No. Alignment)',
        'Digital Property Card Integration GIS Data'
      ],
      technologies: ['RTK Rover GPS', 'Laser Distance Meters', 'Revenue Map Vectorizer', 'GIS Spatial Join'],
      metrics: [
        { label: 'Properties Mapped', value: '45,000+' },
        { label: 'Boundary Accuracy', value: 'Sub-centimeter' },
        { label: 'Dispute Resolution', value: '99.4%' }
      ]
    },
    {
      id: 'utility-survey',
      slug: 'utility-survey',
      category: 'gis',
      title: 'Utility Network & Infrastructure Survey',
      tagline: 'Above & Below Ground Subsurface Network Mapping',
      shortDesc: 'Mapping and identification of underground and above-ground utilities including power distribution lines, water pipelines, gas networks, and telecom fiber.',
      fullDesc: 'We specialize in multi-utility spatial inventory for smart utilities and DISCOMs. Using Ground Penetrating Radar (GPR), electromagnetic pipe/cable locators, and GNSS poles, we pinpoint exact depths and alignments of subsurface assets while mapping overhead 11kV/33kV power poles, transformers, substations, and fiber nodes.',
      icon: 'zap',
      image: 'assets/images/gis/utility-survey.jpg',
      features: [
        'Overhead Electrical Network Asset Mapping (Poles, Transformers, DTs)',
        'Underground Cable & Water Pipeline Depth/Alignment Detection (GPR)',
        'Substation Single Line Diagram (SLD) Spatial Linking',
        'Consumer Indexing & Meter Point Geocoding',
        'GIS Asset Management Integration for Power DISCOMs'
      ],
      deliverables: [
        'Integrated GIS Utility Network Model (ESRI Utility Network / CIM)',
        'Subsurface Utility Engineering (SUE) Quality Level A/B Maps',
        'Electrical Asset Master Database with Asset Attributes',
        'Consumer Electrical Connectivity Network Maps'
      ],
      technologies: ['Ground Penetrating Radar (GPR)', 'Pipe & Cable Locators', 'Mobile GIS Handhelds', 'Network Topology Engine'],
      metrics: [
        { label: 'Utility Corridors', value: '3,200+ km' },
        { label: 'Substations Mapped', value: '140+' },
        { label: 'Depth Detection', value: 'Up to 6m' }
      ]
    },
    {
      id: 'household-survey',
      slug: 'household-survey',
      category: 'gis',
      title: 'Household & Field Data Collection',
      tagline: 'Digital Socio-Economic & Consumer Spatial Indexing',
      shortDesc: 'Digital field data collection and household information surveys using modern mobile GIS applications, geotagged photos, and verified attribute indexing.',
      fullDesc: 'Our dedicated field surveyor force utilizes proprietary mobile GIS collector applications to conduct door-to-door household surveys, government scheme beneficiary validation, consumer electrical indexing, water connection surveys, and urban local body (ULB) census data collection with real-time cloud sync and quality control audits.',
      icon: 'users',
      image: 'assets/images/gis/household-survey.jpg',
      features: [
        'Tablet/Mobile Based Geotagged Field Survey Applications',
        'Door-to-Door Consumer Socio-economic & Utility Audits',
        'Real-time Surveyor GPS Tracking & Fraud Prevention QC',
        'Barcode / QR Code & Electricity Meter Photo Capture',
        'Instant Cloud Validation & Dashboard Analytics'
      ],
      deliverables: [
        'Geocoded Household Database with 50+ Key Attributes',
        'High-Resolution Geotagged Field Photographs',
        'Statistical Field Survey Analytics Reports',
        'Direct Database Migration for ERP & Billing Systems'
      ],
      technologies: ['Android Mobile GIS App', 'Cloud Spatial Sync API', 'Real-time QA Dashboard', 'Biometric & QR Scanners'],
      metrics: [
        { label: 'Households Surveyed', value: '150,000+' },
        { label: 'Daily Survey Run', value: '2,500+ HH' },
        { label: 'Data Accuracy', value: '99.8%' }
      ]
    }
  ];

  private technologiesList: GisTechnology[] = [
    {
      id: 'gnss',
      title: 'GPS & GNSS Surveying',
      tag: 'Millimeter Satellite Positioning',
      description: 'Dual-frequency multi-constellation RTK GNSS systems (GPS, GLONASS, Galileo, NavIC) delivering sub-centimeter geodetic coordinates in real-time.',
      icon: 'satellite',
      accuracy: '± 8 mm + 1 ppm RTK',
      keySpecs: ['NavIC / GPS / GLONASS support', 'RTK Base & Rover configurations', 'Geodetic datum transformation']
    },
    {
      id: 'drone',
      title: 'Drone & UAV Photogrammetry',
      tag: 'High-Altitude Aerial LiDAR & 4K Imaging',
      description: 'Survey-grade DGCA-compliant UAVs equipped with mechanical shutters and RTK modules for large-scale topographic mapping and elevation models.',
      icon: 'navigation',
      accuracy: '2.5 cm GSD Resolution',
      keySpecs: ['Orthomosaic Generation', '3D Point Clouds & DSM', 'Rapid Acreage Coverage']
    },
    {
      id: 'gis-platform',
      title: 'Enterprise GIS & Spatial Analytics',
      tag: 'Advanced Geoprocessing & Spatial Databases',
      description: 'Full-stack geospatial analysis including spatial joins, multi-criteria suitability analysis, buffer zones, and network topology for utilities.',
      icon: 'layers',
      accuracy: 'Multi-layer Topology Integrity',
      keySpecs: ['PostGIS Spatial Engine', 'QGIS / ArcGIS Integration', 'Spatial Query Optimization']
    },
    {
      id: 'satellite-remote',
      title: 'Satellite Remote Sensing',
      tag: 'Multi-Spectral & Radar Imagery Processing',
      description: 'Acquisition and classification of high-resolution optical and SAR satellite imagery for regional land use, vegetation indices, and terrain change detection.',
      icon: 'globe',
      accuracy: '0.3m – 0.5m Optical Satellite Res',
      keySpecs: ['Land Use / Land Cover (LULC)', 'NDVI & Environmental Indices', 'Historical Change Detection']
    },
    {
      id: 'mobile-gis',
      title: 'Mobile Field Data Collection',
      tag: 'Real-Time Synchronized Cloud Mapping',
      description: 'Custom mobile GIS apps enabling surveyors to capture georeferenced attributes, digital signatures, photos, and validation rules offline and online.',
      icon: 'smartphone',
      accuracy: 'Real-time GPS Tracking + QC',
      keySpecs: ['Offline Geo-caching', 'Custom Field Schemas', 'Supervisor Quality Dashboard']
    },
    {
      id: 'subsurface-gpr',
      title: 'Subsurface Utility Engineering',
      tag: 'Underground Radar & Cable Detection',
      description: 'Non-destructive Ground Penetrating Radar (GPR) and precision electromagnetic locators to detect buried pipelines, power cables, and conduits.',
      icon: 'activity',
      accuracy: 'Exact Depth & Alignment Mapping',
      keySpecs: ['Dual-frequency GPR antenna', 'SUE Quality Level A & B', '3D Utility Mapping']
    }
  ];

  private gisProcessSteps: ProcessStep[] = [
    {
      step: 1,
      domain: 'gis',
      title: 'Requirement & Baseline Scope',
      phase: 'Phase 01',
      description: 'Analyzing project boundary (RoW / Cadastral), statutory standards, coordinate reference systems (WGS84 / UTM 43N/44N), and required spatial precision.',
      icon: 'clipboard-check'
    },
    {
      step: 2,
      domain: 'gis',
      title: 'Control Network & Ground Prep',
      phase: 'Phase 02',
      description: 'Establishing geodetic primary and secondary Bench Marks tied to Survey of India GTS pillars with dual-frequency RTK GNSS base stations.',
      icon: 'map-pin'
    },
    {
      step: 3,
      domain: 'gis',
      title: 'High-Density Field Data Capture',
      phase: 'Phase 03',
      description: 'Executing UAV aerial sweeps, Total Station traversing, GPR subsurface scans, or door-to-door mobile digital data collection by certified survey teams.',
      icon: 'navigation'
    },
    {
      step: 4,
      domain: 'gis',
      title: 'GIS Processing & Topology Clean',
      phase: 'Phase 04',
      description: 'Photogrammetric point cloud stitching, orthomosaic rectification, CAD drafting, feature extraction, and strict topological error correction.',
      icon: 'cpu'
    },
    {
      step: 5,
      domain: 'gis',
      title: 'Quality Assurance & Field Audit',
      phase: 'Phase 05',
      description: '100% attribute schema verification, random independent check shots on 10% sample points, and ground truth validation audits.',
      icon: 'shield-check'
    },
    {
      step: 6,
      domain: 'gis',
      title: 'Final Geospatial Delivery',
      phase: 'Phase 06',
      description: 'Handing over validated GIS Shapefiles, Geodatabases, GeoTIFFs, AutoCAD drawings, and setting up interactive web GIS portal maps.',
      icon: 'check-circle'
    }
  ];

  getServices(): ServiceItem[] {
    return this.servicesList;
  }

  getServiceBySlug(slug: string): ServiceItem | undefined {
    return this.servicesList.find(s => s.slug === slug);
  }

  getTechnologies(): GisTechnology[] {
    return this.technologiesList;
  }

  getProcessSteps(): ProcessStep[] {
    return this.gisProcessSteps;
  }
}
