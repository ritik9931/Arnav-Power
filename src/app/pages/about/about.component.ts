import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { StatsCounterComponent } from '../../shared/components/stats-counter/stats-counter.component';
import { ClientService } from '../../core/services/client.service';
import { StatCounterItem } from '../../core/models/client.model';

export interface LeaderMember {
  name: string;
  designation: string;
  bio: string;
  expertise: string;
  image: string;
  imagePosition?: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, SectionHeaderComponent, StatsCounterComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  stats: StatCounterItem[] = [];

  leadershipTeam: LeaderMember[] = [
    {
      name: 'Kishor R. Khotele',
      designation: 'Director',
      bio: 'Spearheads corporate strategy, public sector enterprise partnerships, and large-scale infrastructure expansion across Maharashtra and Central India.',
      expertise: 'Executive Leadership, Strategic Infrastructure & Enterprise Expansion',
      image: 'assets/images/team/kishor-khotele.jpg',
      imagePosition: 'center 10%'
    },
    {
      name: 'Mangesh K. Munishwar',
      designation: 'Solar Head',
      bio: 'Leads turnkey solar engineering, commercial & industrial EPC projects, residential rooftop installations, and DISCOM grid synchronizations.',
      expertise: 'Solar EPC, Grid Synchronization, Net Metering & PM Surya Ghar',
      image: 'assets/images/team/mangesh-munishwar.jpg',
      imagePosition: 'center 8%'
    },
    {
      name: 'Rajshree K. Khotele',
      designation: 'Admin',
      bio: 'Directs corporate administration, regulatory compliance, quality governance, procurement management, and operational resource planning.',
      expertise: 'Corporate Governance, Administrative Operations & Compliance',
      image: 'assets/images/team/rajshree-khotele.jpg',
      imagePosition: 'center 12%'
    },
    {
      name: 'Gaurav J. Khotele',
      designation: 'GIS Head',
      bio: 'Leads high-precision geospatial surveys, drone photogrammetry, cadastral landbase mapping, RTK GNSS surveying, and spatial databases.',
      expertise: 'GIS & Cadastral Mapping, Drone LiDAR & Geodetic Surveys',
      image: 'assets/images/team/gaurav-khotele.jpg',
      imagePosition: 'center 12%'
    }
  ];

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.stats = this.clientService.getStats();
  }
}
