export type ServiceCategory = 'gis' | 'solar';

export interface ServiceItem {
  id: string;
  slug: string;
  category: ServiceCategory;
  title: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  image: string;
  features: string[];
  deliverables: string[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
}

export interface GisTechnology {
  id: string;
  title: string;
  tag: string;
  description: string;
  icon: string;
  accuracy: string;
  keySpecs: string[];
}

export interface ProcessStep {
  step: number;
  domain: 'gis' | 'solar';
  title: string;
  phase: string;
  description: string;
  icon: string;
}
