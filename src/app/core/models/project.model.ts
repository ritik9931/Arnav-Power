export type ProjectCategory = 'GIS Survey' | 'Landbase Survey' | 'Property Survey' | 'Utility Survey' | 'Household Survey' | 'Solar Installation';
export type SolarCategory = 'Residential' | 'Commercial' | 'Industrial';

export interface GalleryImage {
  url: string;
  caption: string;
  phase: 'before' | 'during' | 'completed' | 'aerial';
}

export interface SolarProject {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  category: SolarCategory;
  location: string;
  city: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  capacityKw: number;
  panelsInstalled: number;
  panelBrand: string;
  inverterSpecs: string;
  status: 'Completed' | 'In Progress' | 'Commissioned';
  completionDate: string;
  description: string;
  detailedScope: string[];
  heroImage: string;
  gallery: GalleryImage[];
  annualGenerationKwh: number;
  co2OffsetTons: number;
  paybackEstimatedYears: number;
}

export interface GisProject {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  category: ProjectCategory;
  location: string;
  city: string;
  state: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  surveyPointsCollected: number;
  areaCoverageSqKm: number;
  status: 'Completed' | 'In Progress';
  completionDate: string;
  description: string;
  image: string;
  technologiesUsed: string[];
}

export interface UnifiedProjectItem {
  id: string;
  slug: string;
  domain: 'gis' | 'solar';
  title: string;
  category: string;
  client: string;
  location: string;
  capacityOrScale: string;
  status: string;
  image: string;
  description: string;
  link: string;
}
