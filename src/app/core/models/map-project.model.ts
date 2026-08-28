export type MapCategoryFilter = 'all' | 'solar' | 'residential' | 'gis';

export interface MapProject {
  id: string;
  projectName: string;
  companyName: string;
  projectType: string;
  category: 'solar' | 'residential' | 'gis' | 'hq';
  location: string;
  status: string;
  lat: number;
  lng: number;
  capacityOrScale?: string;
  image?: string;
  link?: string;
  isHq?: boolean;
}
