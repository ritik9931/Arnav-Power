import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SolarService } from '../../../core/services/solar.service';

@Component({
  selector: 'app-solar-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './solar-calculator.component.html',
  styleUrls: ['./solar-calculator.component.scss']
})
export class SolarCalculatorComponent implements OnInit {
  customerType = signal<'residential' | 'commercial' | 'industrial'>('residential');
  inputType = signal<'bill' | 'area'>('bill');
  inputValue = signal<number>(5000);

  minRange = computed(() => this.inputType() === 'bill' ? 1000 : 200);
  maxRange = computed(() => this.inputType() === 'bill' ? (this.customerType() === 'industrial' ? 300000 : 50000) : 10000);
  stepRange = computed(() => this.inputType() === 'bill' ? (this.customerType() === 'industrial' ? 5000 : 500) : 100);

  estimate = computed(() => {
    return this.solarService.calculateSolarEstimate(
      this.inputValue(),
      this.inputType(),
      this.customerType()
    );
  });

  constructor(private solarService: SolarService) {}

  ngOnInit() {
    this.updateDefaults();
  }

  setCustomerType(type: 'residential' | 'commercial' | 'industrial') {
    this.customerType.set(type);
    this.updateDefaults();
  }

  setInputType(type: 'bill' | 'area') {
    this.inputType.set(type);
    this.updateDefaults();
  }

  private updateDefaults() {
    if (this.inputType() === 'bill') {
      if (this.customerType() === 'residential') this.inputValue.set(4500);
      else if (this.customerType() === 'commercial') this.inputValue.set(25000);
      else this.inputValue.set(120000);
    } else {
      if (this.customerType() === 'residential') this.inputValue.set(600);
      else if (this.customerType() === 'commercial') this.inputValue.set(2500);
      else this.inputValue.set(12000);
    }
  }
}
