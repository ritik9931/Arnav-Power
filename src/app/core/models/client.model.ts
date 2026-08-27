export interface ClientItem {
  id: string;
  name: string;
  shortName: string;
  sector: 'Industrial' | 'Government & Municipal' | 'Real Estate & Infrastructure' | 'Renewable Energy' | 'Utilities';
  location: string;
  projectType: string;
  logoBg: string;
  initials: string;
  rating: number;
  testimonial?: string;
  spokesperson?: string;
  designation?: string;
}

export interface StatCounterItem {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
  icon: string;
  domain: 'gis' | 'solar' | 'general';
}
