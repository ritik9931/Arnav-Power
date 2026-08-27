import { Injectable } from '@angular/core';
import { ClientItem, StatCounterItem } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private stats: StatCounterItem[] = [
    {
      id: 'projects-completed',
      value: 500,
      suffix: '+',
      label: 'Projects Delivered',
      sublabel: 'Across GIS, Survey & Solar Sectors',
      icon: 'check-circle',
      domain: 'general'
    },
    {
      id: 'survey-points',
      value: 1250000,
      suffix: '+',
      label: 'Survey Points Mapped',
      sublabel: 'With Millimeter RTK & Total Station Precision',
      icon: 'map-pin',
      domain: 'gis'
    },
    {
      id: 'solar-capacity',
      value: 15,
      suffix: '+ MW',
      label: 'Solar Capacity Commissioned',
      sublabel: 'Industrial, Commercial & Residential Rooftops',
      icon: 'sun',
      domain: 'solar'
    },
    {
      id: 'client-satisfaction',
      value: 99.4,
      suffix: '%',
      label: 'Client Satisfaction Rate',
      sublabel: 'Proven Execution, Compliance & Quality SLA',
      icon: 'award',
      domain: 'general'
    }
  ];

  private clients: ClientItem[] = [
    {
      id: 'msedcl',
      name: 'Maharashtra State Electricity Distribution Co.',
      shortName: 'MSEDCL',
      sector: 'Utilities',
      location: 'Nagpur & Vidarbha Zone',
      projectType: 'Consumer Indexing & 11kV GIS Network Mapping',
      logoBg: '#0A2540',
      initials: 'MSEDCL',
      rating: 5,
      testimonial: 'Arnav Power Solution Services executed high-density electrical consumer indexing and substation asset geocoding with remarkable speed and precision.',
      spokesperson: 'Superintending Engineer',
      designation: 'MSEDCL Urban Infrastructure Division'
    },
    {
      id: 'midc',
      name: 'Maharashtra Industrial Development Corporation',
      shortName: 'MIDC',
      sector: 'Government & Municipal',
      location: 'Butibori & Hingna',
      projectType: 'Industrial Plot Cadastral & Topographic Demarcation',
      logoBg: '#0052CC',
      initials: 'MIDC',
      rating: 5,
      testimonial: 'Their DGPS and Drone topographic models were instrumental in resolving historic boundary variances and accelerating industrial layout approvals.',
      spokesperson: 'Regional Officer',
      designation: 'MIDC Nagpur Zone'
    },
    {
      id: 'abc-ind',
      name: 'ABC Industries Group',
      shortName: 'ABC Ind.',
      sector: 'Industrial',
      location: 'Nagpur, Maharashtra',
      projectType: '250 kW Turnkey Industrial Rooftop Solar Plant',
      logoBg: '#00A3FF',
      initials: 'ABC',
      rating: 5,
      testimonial: 'The solar EPC execution was completed within 18 days with zero downtime on our manufacturing floor. Our monthly power bills have dropped by over 38%.',
      spokesperson: 'Director of Operations',
      designation: 'ABC Heavy Engineering'
    },
    {
      id: 'vidarbha-textile',
      name: 'Vidarbha Integrated Textile Park',
      shortName: 'VITP',
      sector: 'Industrial',
      location: 'Amravati / Nagpur Highway',
      projectType: '650 kW Captive Solar EPC & SCADA Integration',
      logoBg: '#10B981',
      initials: 'VITP',
      rating: 5,
      testimonial: 'Exceptional solar engineering design and flawless CEIG liaisoning. The automated monitoring system gives us complete transparency over generation.',
      spokesperson: 'Plant Head',
      designation: 'Textile Operations'
    },
    {
      id: 'nagpur-smart-city',
      name: 'Nagpur Smart and Sustainable City Development Corp',
      shortName: 'NSSCDCL',
      sector: 'Government & Municipal',
      location: 'Nagpur, Maharashtra',
      projectType: 'Smart Underground Utility Mapping & GPR Survey',
      logoBg: '#6366F1',
      initials: 'SMART',
      rating: 5,
      testimonial: 'Their Subsurface Utility Engineering team detected critical high-pressure pipelines and fiber lines that prevented costly excavations during road upgrades.',
      spokesperson: 'Chief Technical Officer',
      designation: 'Nagpur Smart City Mission'
    },
    {
      id: 'apex-logistics',
      name: 'Apex Multimodal Logistics Parks',
      shortName: 'Apex',
      sector: 'Real Estate & Infrastructure',
      location: 'Kalmeshwar Road, Nagpur',
      projectType: '400 kW Commercial Rooftop Solar & Carport',
      logoBg: '#F59E0B',
      initials: 'APEX',
      rating: 5,
      testimonial: 'Arnav Power Solution delivered a high-yield solar installation with elevated structural pergolas that provide covered parking while generating clean energy.',
      spokesperson: 'VP - Infrastructure',
      designation: 'Apex Logistics Parks'
    }
  ];

  getStats(): StatCounterItem[] {
    return this.stats;
  }

  getClients(): ClientItem[] {
    return this.clients;
  }
}
