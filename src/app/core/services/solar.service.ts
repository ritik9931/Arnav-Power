import { Injectable } from '@angular/core';
import { ServiceItem, ProcessStep } from '../models/service.model';
import { SolarProject } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class SolarService {
  private servicesList: ServiceItem[] = [
    {
      id: 'residential-solar',
      slug: 'residential-solar',
      category: 'solar',
      title: 'Residential Rooftop Solar',
      tagline: 'Clean Energy & Zero Electricity Bills for Modern Homes',
      shortDesc: 'Turnkey rooftop solar installations for individual bungalows, housing societies, and apartment complexes with PM Surya Ghar Muft Bijli Yojana subsidy support.',
      fullDesc: 'We engineer premium residential rooftop solar energy systems that drastically reduce monthly utility bills by up to 90%. Our systems utilize top-tier Tier-1 Mono PERC / TOPCon bifacial solar panels, smart app-monitored hybrid inverters, and hot-dip galvanized elevated mounting structures designed for Indian wind load conditions.',
      icon: 'home',
      image: 'assets/images/solar/residential-solar.jpg',
      features: [
        'Central Govt PM Surya Ghar Subsidy Assistance (Up to ₹78,000)',
        'Net Metering Integration with State DISCOM (MSEDCL/MPPKVVCL)',
        'Custom Elevated Structure for usable rooftop leisure space',
        '25-Year Linear Power Performance Warranty on Solar Modules',
        'Real-time Mobile App for generation and savings tracking'
      ],
      deliverables: [
        'Complete 3kW to 15kW Rooftop Solar Installation',
        'Bi-directional Net Meter Inspection & Commissioning',
        'Surge Protection Devices (SPD) & Dual Chemical Earthing',
        'Handover Manual & Mobile App Monitoring Credentials'
      ],
      technologies: ['TOPCon 550W+ Bifacial Panels', 'IP65 Grid-Tie Inverters', 'Hot-dip Galvanized Structure', 'Micro-inverter Options'],
      metrics: [
        { label: 'Avg. Bill Reduction', value: '85% - 95%' },
        { label: 'System Life', value: '25+ Years' },
        { label: 'ROI Period', value: '3 - 4 Years' }
      ]
    },
    {
      id: 'commercial-solar',
      slug: 'commercial-solar',
      category: 'solar',
      title: 'Commercial Solar Solutions',
      tagline: 'Lower Operational Costs & ESG Compliance for Enterprises',
      shortDesc: 'Cost-effective on-grid and hybrid solar installations for corporate offices, hospitals, shopping complexes, hotels, and educational institutions.',
      fullDesc: 'Commercial power tariffs in India are among the highest. Our commercial solar installations provide immediate operational expenditure reduction with accelerated depreciation tax benefits under Section 32 of the Income Tax Act. We design custom solar carports, metal sheet rooftops, and RCC elevated systems engineered for maximum yield.',
      icon: 'briefcase',
      image: 'assets/images/solar/commercial-solar.jpg',
      features: [
        'Accelerated Depreciation (40% Tax Benefit in Year 1)',
        'Zero-Export Protection & DG (Diesel Generator) Synchronization',
        'Solar Carport Structures for premium covered parking',
        'High-Efficiency Three-Phase String Inverters with Multiple MPPTs',
        'Remote SCADA & Generation Analytics'
      ],
      deliverables: [
        'Detailed Solar Engineering Design & Structural Stability Report',
        'High-Tension / Low-Tension Net Metering & CEIG Approvals',
        'Comprehensive Testing, Lightning Protection & Commissioning',
        '1-Year Free Comprehensive Operations & Maintenance (O&M)'
      ],
      technologies: ['Tier-1 High-Efficiency Modules', 'Three-Phase Smart Inverters', 'DG-PV Sync Controllers', 'Cloud SCADA Platform'],
      metrics: [
        { label: 'Installed Base', value: '12+ MW' },
        { label: 'Tariff Offset', value: '₹8 - ₹12 / Unit' },
        { label: 'Typical Payback', value: '2.8 - 3.5 Years' }
      ]
    },
    {
      id: 'industrial-solar',
      slug: 'industrial-solar',
      category: 'solar',
      title: 'Industrial & Large-Scale Solar',
      tagline: 'Megawatt-Scale Captive & Open Access Power Plants',
      shortDesc: 'Heavy-duty industrial rooftop and ground-mounted solar power plants for factories, steel plants, textile parks, MIDC units, and cold storage facilities.',
      fullDesc: 'We deliver end-to-end turnkey EPC services for megawatt-scale industrial solar plants. From geotechnical soil testing, HT power evacuation, transformer synchronization, and CEIG statutory clearances, our engineering team ensures maximum uptime, low levelized cost of energy (LCOE), and seamless integration with existing industrial power distribution.',
      icon: 'factory',
      image: 'assets/images/solar/industrial-solar.jpg',
      features: [
        'Captive & Group Captive Model Solar EPC',
        'Trapezoidal / Klip-Lok Metal Roof Non-Penetrative Clamping',
        'Ground-Mount Piled / Ballasted Foundation Solar Arrays',
        'Central & Multi-string Inverter Configurations with HT Transformers',
        'Automated Robotic Cleaning System integration'
      ],
      deliverables: [
        'PVSyst Simulation & Generation Forecast Reports (P50/P90)',
        'CEIG (Chief Electrical Inspector) Statutory Approval',
        'HT Yard Synchronization & SCADA Integration',
        'Long-term AMC / O&M Performance Ratio (PR) Guarantee'
      ],
      technologies: ['N-Type TOPCon Panels', 'Central / Utility String Inverters', 'Robotic Dry Cleaners', 'Weather Monitoring Stations'],
      metrics: [
        { label: 'Carbon Offset', value: '18,000+ Tons/yr' },
        { label: 'Uptime SLA', value: '99.5%' },
        { label: 'Capacity Range', value: '100 kW to 10 MW' }
      ]
    },
    {
      id: 'solar-site-survey',
      slug: 'solar-site-survey',
      category: 'solar',
      title: 'Solar Site Assessment & 3D Shadow Analysis',
      tagline: 'GIS-Driven Feasibility, Irradiation & 3D Terrain Analysis',
      shortDesc: 'Technical site inspection, drone 3D rooftop modeling, solar irradiance assessment, and structural load analysis for optimum system orientation.',
      fullDesc: 'Leveraging our core GIS and Drone capabilities, we perform advanced 3D shadow analysis using Digital Elevation Models and sun path trajectory simulations for every hour of the year. This ensures zero unexpected shadow losses from adjacent buildings, chimneys, or trees before a single screw is installed.',
      icon: 'sun',
      image: 'assets/images/solar/solar-site-survey.jpg',
      features: [
        'Drone UAV 3D Point Cloud Rooftop Reconstruction',
        'Annual 365-Day Sun Path & 3D Shadow Simulation (PVSyst / Helioscope)',
        'Structural Dead Load & Wind Load Bearing Analysis',
        'Electrical Infrastructure & Transformer Capacity Audit',
        'Economic Feasibility, LCOE & Generation Projection Report'
      ],
      deliverables: [
        'Comprehensive 3D Solar Potential Report',
        'Shadow Loss Heatmaps across Summer & Winter Solstices',
        'Single Line Electrical Diagram (SLD) & Array Layout',
        'Precise Bill of Materials (BOM) & Financial Model'
      ],
      technologies: ['PVSyst 7.4', 'Helioscope 3D', 'Drone 3D Mesh', 'Meteonorm Solar Data'],
      metrics: [
        { label: 'Simulation Accuracy', value: '98.5%' },
        { label: 'Shadow Loss Margin', value: '< 1.5%' },
        { label: 'Sites Assessed', value: '450+' }
      ]
    },
    {
      id: 'solar-installation-epc',
      slug: 'solar-installation-epc',
      category: 'solar',
      title: 'Turnkey Solar Installation & Commissioning',
      tagline: 'Engineering Precision, Premium Hardware & Safety Standards',
      shortDesc: 'End-to-end EPC execution from structural fabrication, electrical wiring, lightning protection, inverter sync, to DISCOM net-meter commissioning.',
      fullDesc: 'Our certified engineers and technicians execute solar installations adhering strictly to CEA, IEC, and MNRE technical guidelines. We use corrosion-resistant anodized aluminium clamps, hot-dip galvanized mounting structures (minimum 80 microns), UV-resistant solar DC cables, and dedicated chemical earthing pits for absolute safety.',
      icon: 'tool',
      image: 'assets/images/solar/solar-epc.jpg',
      features: [
        'MNRE & IEC Standard Compliant Hardware Execution',
        'Engineered Module Mounting Structures (Wind rated up to 150 km/h)',
        'UV Protected XLPO DC Solar Cables with MC4 Connectors',
        'Class-I & II Lightning Arrester (ESE) & Copper Chemical Earthing',
        'DISCOM Net Meter Testing, Inspection & Synchronization'
      ],
      deliverables: [
        'Commissioned Grid-Tied Solar Energy System',
        'Signed CEIG / DISCOM Net Metering Certificate',
        'As-Built Drawings & String Layout Schematics',
        'Warranty Certificates & Safety Compliance Kit'
      ],
      technologies: ['Crimping & Torque Calibrated Tools', 'Thermal Imaging Drone Audits', 'Megger Insulation Testers'],
      metrics: [
        { label: 'Commissioning Rate', value: '100% First-Pass' },
        { label: 'Safety Record', value: 'Zero Incidents' },
        { label: 'Average Execution', value: '7 - 14 Days' }
      ]
    },
    {
      id: 'solar-monitoring-om',
      slug: 'solar-monitoring-om',
      category: 'solar',
      title: 'Solar Monitoring, SCADA & O&M',
      tagline: 'Real-Time Telemetry, Preventive Maintenance & Max Generation',
      shortDesc: '24/7 cloud performance monitoring, automated anomaly alerts, thermographic drone inspections, and scheduled preventive cleaning and servicing.',
      fullDesc: 'A solar plant is a 25-year financial asset. Our dedicated Operation & Maintenance (O&M) division monitors plant generation via IoT SCADA gateways. We detect soiling losses, string failures, and hot spots through thermal drone sweeps, ensuring your plant delivers its guaranteed Performance Ratio (PR) year after year.',
      icon: 'activity',
      image: 'assets/images/solar/solar-monitoring.jpg',
      features: [
        '24/7 Cloud SCADA Telemetry & Performance Ratio (PR) Tracking',
        'Automated Inverter Anomaly & Grid Failure Alerts via SMS/Email',
        'Thermographic Infrared Drone Audits for Hotspot Detection',
        'Scheduled High-Pressure / Demineralized Water Cleaning Cycles',
        'Electrical Preventive Maintenance (Nut-bolt torque & insulation test)'
      ],
      deliverables: [
        'Monthly Energy Generation & PR Performance Report',
        'Thermal Scan Defect Rectification Logs',
        'Corrective Breakdown Response within 4 Hours',
        'Annual Inverter Health & Efficiency Audit'
      ],
      technologies: ['IoT Cloud Data Logger', 'FLIR Infrared Thermal Sensors', 'Automated Water Sprinklers', 'Predictive AI Analytics'],
      metrics: [
        { label: 'Avg. PR Maintained', value: '> 81%' },
        { label: 'Uptime Guarantee', value: '99.5%' },
        { label: 'Plants Monitored', value: '65+' }
      ]
    }
  ];

  private solarProjectsList: SolarProject[] = [
    {
      id: 'abc-industries-nagpur',
      slug: 'abc-industries-nagpur',
      title: 'ABC Industries Solar Plant',
      clientName: 'ABC Industries Ltd.',
      category: 'Industrial',
      location: 'Plot 42, Butibori MIDC, Nagpur, Maharashtra',
      city: 'Nagpur',
      state: 'Maharashtra',
      coordinates: {
        lat: 21.0116,
        lng: 78.9664
      },
      capacityKw: 250,
      panelsInstalled: 450,
      panelBrand: 'Tier-1 Mono PERC 550W Bifacial',
      inverterSpecs: '2x 100kW + 1x 50kW Sungrow Three-Phase Grid-Tie',
      status: 'Completed',
      completionDate: 'November 2024',
      description: 'A flagship 250 kWp industrial rooftop solar installation on a heavy manufacturing facility in Butibori MIDC, Nagpur. The system is designed to offset 40% of the factory\'s daytime electrical consumption with DG-PV synchronization.',
      detailedScope: [
        'Custom non-penetrative aluminium railing on trapezoidal metal roofing',
        '450 High-efficiency 550W Tier-1 Bifacial modules with 25-year warranty',
        'Dedicated 4-core copper solar chemical earthing system with ESE lightning arrester',
        'Real-time IoT cloud SCADA data logging integrated with factory electrical distribution',
        'MSEDCL 33kV Net Metering synchronization and CEIG inspection approval'
      ],
      heroImage: 'assets/images/projects/abc-industries.jpg',
      gallery: [
        {
          url: 'assets/images/projects/abc-industries.jpg',
          caption: 'Completed 250 kWp solar array on metal industrial roof at Butibori MIDC',
          phase: 'completed'
        },
        {
          url: 'assets/images/solar/industrial-solar.jpg',
          caption: 'Aerial drone view showing multi-string array alignment and sun exposure',
          phase: 'aerial'
        },
        {
          url: 'assets/images/solar/solar-site-survey.jpg',
          caption: 'Pre-installation 3D drone survey and structural load assessment',
          phase: 'before'
        },
        {
          url: 'assets/images/solar/solar-epc.jpg',
          caption: 'Engineers mounting high-grade anodized clamps and string cabling',
          phase: 'during'
        }
      ],
      annualGenerationKwh: 375000,
      co2OffsetTons: 310,
      paybackEstimatedYears: 3.2
    },
    {
      id: 'maharashtra-textile-park',
      slug: 'maharashtra-textile-park',
      title: 'Maharashtra Mega Textile Park Solar Grid',
      clientName: 'Vidarbha Integrated Textile Hub',
      category: 'Industrial',
      location: 'Nandgaon Peth MIDC, Amravati Road, Maharashtra',
      city: 'Amravati',
      state: 'Maharashtra',
      coordinates: {
        lat: 20.9374,
        lng: 77.7796
      },
      capacityKw: 650,
      panelsInstalled: 1180,
      panelBrand: '550W N-Type TOPCon Dual-Glass',
      inverterSpecs: '5x 125kW Huawei Smart String Inverters',
      status: 'Completed',
      completionDate: 'January 2025',
      description: 'A large-scale 650 kW industrial rooftop solar power plant installed across 3 spinning mill sheds. Provides over 950,000 units of clean electricity annually, cutting power tariffs significantly.',
      detailedScope: [
        'Engineered hot-dip galvanized mounting structures built to withstand 150 km/h wind speeds',
        '1,180 Dual-glass TOPCon modules engineered for high ambient temperature resilience',
        'Zero-export smart controller with automated generator synchronization',
        'Automated robotic dry cleaning system for uninterrupted peak generation',
        'CEIG certified 11kV grid synchronization and SCADA integration'
      ],
      heroImage: 'assets/images/projects/maharashtra-textile.jpg',
      gallery: [
        {
          url: 'assets/images/projects/maharashtra-textile.jpg',
          caption: 'Panoramic view of 650 kW installation across textile sheds',
          phase: 'completed'
        },
        {
          url: 'assets/images/solar/commercial-solar.jpg',
          caption: 'Top-down aerial drone telemetry mapping panel cleanliness',
          phase: 'aerial'
        },
        {
          url: 'assets/images/solar/solar-monitoring.jpg',
          caption: 'Central SCADA monitoring console and power distribution synchronization',
          phase: 'during'
        }
      ],
      annualGenerationKwh: 975000,
      co2OffsetTons: 820,
      paybackEstimatedYears: 2.9
    },
    {
      id: 'central-india-logistics-hub',
      slug: 'central-india-logistics-hub',
      title: 'Central India Logistics & Warehouse Solar',
      clientName: 'Apex Warehousing & Logistics Corp',
      category: 'Commercial',
      location: 'Kalmeshwar Road, Nagpur, Maharashtra',
      city: 'Nagpur',
      state: 'Maharashtra',
      coordinates: {
        lat: 21.2335,
        lng: 78.9168
      },
      capacityKw: 400,
      panelsInstalled: 730,
      panelBrand: '545W Mono PERC High-Density',
      inverterSpecs: '4x 100kW Delta Solar Three-Phase',
      status: 'Completed',
      completionDate: 'December 2024',
      description: 'A 400 kW commercial solar project on an automated cold chain logistics facility. Powers 24/7 cold storage units, significantly decreasing dependence on diesel generators.',
      detailedScope: [
        '730 High-efficiency Mono PERC modules across two warehouse roofs',
        'Elevated walkway system for safe maintenance and cleaning access',
        'Hybrid inverter integration with battery energy storage system (BESS)',
        'Comprehensive 10-year Operations & Maintenance contract with performance guarantee'
      ],
      heroImage: 'assets/images/projects/central-logistics.jpg',
      gallery: [
        {
          url: 'assets/images/projects/central-logistics.jpg',
          caption: 'Logistics facility rooftop covered in high-output solar modules',
          phase: 'completed'
        },
        {
          url: 'assets/images/solar/solar-site-survey.jpg',
          caption: 'Inverter array and AC distribution board wiring during commissioning',
          phase: 'during'
        }
      ],
      annualGenerationKwh: 600000,
      co2OffsetTons: 495,
      paybackEstimatedYears: 3.1
    },
    {
      id: 'vidarbha-agro-rooftop',
      slug: 'vidarbha-agro-rooftop',
      title: 'Vidarbha Agro Processing Solar Rooftop',
      clientName: 'Vidarbha Agro Industries Pvt. Ltd.',
      category: 'Commercial',
      location: 'Wardha Road Industrial Area, Nagpur, Maharashtra',
      city: 'Nagpur',
      state: 'Maharashtra',
      coordinates: {
        lat: 21.0532,
        lng: 79.0548
      },
      capacityKw: 120,
      panelsInstalled: 220,
      panelBrand: '545W Mono PERC Half-Cut',
      inverterSpecs: '1x 100kW + 1x 20kW Growatt Inverters',
      status: 'Commissioned',
      completionDate: 'February 2025',
      description: 'A 120 kW commercial solar project powering grain processing and oil extraction machinery. Drastically stabilizes industrial electricity expenditure.',
      detailedScope: [
        '220 Half-cut mono PERC solar modules installed on curved RCC roof',
        'Custom angle tilt frames optimized for Vidarbha solar azimuth (21° North latitude)',
        'MSEDCL LT Net Metering synchronization',
        'Mobile telemetry app setup for live tracking on smartphones'
      ],
      heroImage: 'assets/images/projects/vidarbha-agro.jpg',
      gallery: [
        {
          url: 'assets/images/projects/vidarbha-agro.jpg',
          caption: 'Vidarbha Agro plant rooftop solar array completed and generating power',
          phase: 'completed'
        }
      ],
      annualGenerationKwh: 180000,
      co2OffsetTons: 152,
      paybackEstimatedYears: 3.4
    },
    {
      id: 'seminary-hills-smart-residential',
      slug: 'seminary-hills-smart-residential',
      title: 'Seminary Hills Villa Colony Solar Grid',
      clientName: 'Seminary Hills Green Enclave Society',
      category: 'Residential',
      location: 'Near Seminary Hills Forest Reserve, Civil Lines, Nagpur',
      city: 'Nagpur',
      state: 'Maharashtra',
      coordinates: {
        lat: 21.169158,
        lng: 79.042789
      },
      capacityKw: 45,
      panelsInstalled: 82,
      panelBrand: '550W All-Black Monocrystalline',
      inverterSpecs: '3x 15kW Hybrid Inverters with Lithium Storage',
      status: 'Completed',
      completionDate: 'October 2024',
      description: 'A micro-grid solar solution for an eco-luxury residential enclave in Seminary Hills, Nagpur. Features custom elevated pergolas that preserve usable terrace gardens.',
      detailedScope: [
        'Architectural solar pergola structure providing shaded leisure space',
        '82 Premium aesthetic all-black monocrystalline modules',
        'Lithium-ion battery storage backup for zero-interruption lighting & cooling',
        'PM Surya Ghar Muft Bijli Yojana subsidy disbursed directly to homeowners'
      ],
      heroImage: 'assets/images/projects/seminary-hills-solar.jpg',
      gallery: [
        {
          url: 'assets/images/projects/seminary-hills-solar.jpg',
          caption: 'Elevated solar pergola structure integrated with rooftop terrace garden',
          phase: 'completed'
        }
      ],
      annualGenerationKwh: 68000,
      co2OffsetTons: 58,
      paybackEstimatedYears: 3.8
    },
    {
      id: 'nagpur-commercial-tower',
      slug: 'nagpur-commercial-tower',
      title: 'Skyline Business Center On-Grid Solar',
      clientName: 'Skyline Commercial Properties',
      category: 'Commercial',
      location: 'Central Avenue, Civil Lines, Nagpur, Maharashtra',
      city: 'Nagpur',
      state: 'Maharashtra',
      coordinates: {
        lat: 21.1458,
        lng: 79.0882
      },
      capacityKw: 180,
      panelsInstalled: 328,
      panelBrand: '550W Bifacial TOPCon Modules',
      inverterSpecs: '2x 80kW Sungrow Inverters',
      status: 'Completed',
      completionDate: 'August 2024',
      description: 'An urban commercial tower solar project utilizing rooftop and solar façade shading. Generates clean energy for centralized HVAC systems and common area lighting.',
      detailedScope: [
        '328 Bifacial solar modules utilizing rooftop white reflective coating for 12% additional underside yield',
        'Smart power factor correction panel integration',
        'Building Management System (BMS) Modbus telemetry connectivity',
        'Accelerated Depreciation tax certification issued'
      ],
      heroImage: 'assets/images/projects/skyline-tower.jpg',
      gallery: [
        {
          url: 'assets/images/projects/skyline-tower.jpg',
          caption: 'Commercial rooftop installation in central Nagpur business district',
          phase: 'completed'
        }
      ],
      annualGenerationKwh: 270000,
      co2OffsetTons: 225,
      paybackEstimatedYears: 3.0
    }
  ];

  private solarProcessSteps: ProcessStep[] = [
    {
      step: 1,
      domain: 'solar',
      title: 'Site Assessment & 3D Shadow Study',
      phase: 'Step 01',
      description: 'Detailed drone survey, structural load calculation, 3D sun-path simulation, and electrical audit of LT/HT connections.',
      icon: 'sun'
    },
    {
      step: 2,
      domain: 'solar',
      title: 'Engineering Design & PVSyst Modeling',
      phase: 'Step 02',
      description: 'PVSyst energy yield modeling, module layout drafting, Single Line Diagram (SLD), and DISCOM net-metering feasibility filing.',
      icon: 'layout'
    },
    {
      step: 3,
      domain: 'solar',
      title: 'Procurement of Tier-1 Hardware',
      phase: 'Step 03',
      description: 'Dispatch of ALMM-listed high efficiency modules, smart inverters, hot-dip galvanized structures, and safety switchgear.',
      icon: 'package'
    },
    {
      step: 4,
      domain: 'solar',
      title: 'Precision Mechanical & Electrical EPC',
      phase: 'Step 04',
      description: 'Structural bolting, module mounting, DC string cabling, SPD/Earthing pits installation, and inverter wiring by certified engineers.',
      icon: 'tool'
    },
    {
      step: 5,
      domain: 'solar',
      title: 'Testing, CEIG & Net Metering',
      phase: 'Step 05',
      description: 'Insulation testing, CEIG statutory inspection, bi-directional net meter installation by DISCOM, and live grid synchronization.',
      icon: 'check-circle'
    },
    {
      step: 6,
      domain: 'solar',
      title: 'IoT Monitoring & Preventive O&M',
      phase: 'Step 06',
      description: 'Activation of smartphone generation dashboard, cloud telemetry alerts, and scheduled warranty maintenance cycles.',
      icon: 'activity'
    }
  ];

  getServices(): ServiceItem[] {
    return this.servicesList;
  }

  getServiceBySlug(slug: string): ServiceItem | undefined {
    return this.servicesList.find(s => s.slug === slug);
  }

  getProjects(): SolarProject[] {
    return this.solarProjectsList;
  }

  getProjectBySlug(slug: string): SolarProject | undefined {
    return this.solarProjectsList.find(p => p.slug === slug || p.id === slug);
  }

  getProcessSteps(): ProcessStep[] {
    return this.solarProcessSteps;
  }

  calculateSolarEstimate(monthlyBillOrArea: number, inputType: 'bill' | 'area' = 'bill', customerType: 'residential' | 'commercial' | 'industrial' = 'residential') {
    let systemKw = 3;
    const tariffRate = customerType === 'residential' ? 8.5 : customerType === 'commercial' ? 11.5 : 9.5;

    if (inputType === 'bill') {
      const unitsPerMonth = monthlyBillOrArea / tariffRate;
      systemKw = Math.max(2, Math.round((unitsPerMonth / 120) * 10) / 10);
    } else {
      systemKw = Math.max(2, Math.round((monthlyBillOrArea / 90) * 10) / 10);
    }

    const annualUnits = Math.round(systemKw * 1500);
    const annualSavings = Math.round(annualUnits * tariffRate);
    const co2Offset = Math.round(annualUnits * 0.82) / 1000;
    const estimatedCost = Math.round(systemKw * (customerType === 'residential' ? 58000 : 48000));
    const subsidy = customerType === 'residential' ? (systemKw <= 2 ? 60000 : 78000) : 0;
    const netCost = Math.max(25000, estimatedCost - subsidy);
    const paybackYears = Math.round((netCost / annualSavings) * 10) / 10;

    return {
      systemKw,
      annualUnits,
      annualSavings,
      monthlySavings: Math.round(annualSavings / 12),
      co2Offset,
      estimatedCost,
      subsidy,
      netCost,
      paybackYears
    };
  }
}
