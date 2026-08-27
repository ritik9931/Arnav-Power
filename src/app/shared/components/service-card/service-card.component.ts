import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceItem } from '../../../core/models/service.model';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent {
  @Input({ required: true }) service!: ServiceItem;
  @Input() routePrefix: string = '';

  get routerLinkPath(): string {
    if (this.routePrefix) {
      return `${this.routePrefix}`;
    }
    return this.service.category === 'gis' ? '/gis-survey' : '/solar-solutions';
  }
}
