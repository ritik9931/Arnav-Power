import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SolarService } from '../../core/services/solar.service';
import { ServiceItem, ProcessStep } from '../../core/models/service.model';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { SolarCalculatorComponent } from '../../shared/components/solar-calculator/solar-calculator.component';

@Component({
  selector: 'app-solar-solutions',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SectionHeaderComponent,
    ServiceCardComponent,
    SolarCalculatorComponent
  ],
  templateUrl: './solar-solutions.component.html',
  styleUrls: ['./solar-solutions.component.scss']
})
export class SolarSolutionsComponent implements OnInit {
  services: ServiceItem[] = [];
  processSteps: ProcessStep[] = [];

  solarBenefits = [
    {
      title: 'Up to 90% Power Bill Reduction',
      desc: 'Offset high DISCOM LT/HT tariffs with clean on-site solar power generation.',
      icon: 'zap'
    },
    {
      title: 'Accelerated Depreciation (40%)',
      desc: 'Commercial and industrial enterprises can claim 40% tax depreciation in Year 1.',
      icon: 'trending-up'
    },
    {
      title: 'Direct PM Surya Ghar Subsidy',
      desc: 'Residential customers receive up to ₹78,000 direct bank transfer subsidies.',
      icon: 'gift'
    },
    {
      title: '25-Year Guaranteed Generation',
      desc: 'Tier-1 Mono PERC & TOPCon modules backed by 25-year linear performance warranties.',
      icon: 'shield-check'
    }
  ];

  constructor(private solarService: SolarService) {}

  ngOnInit() {
    this.services = this.solarService.getServices();
    this.processSteps = this.solarService.getProcessSteps();
  }
}
