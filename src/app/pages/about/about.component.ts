import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';
import { StatsCounterComponent } from '../../shared/components/stats-counter/stats-counter.component';
import { ClientService } from '../../core/services/client.service';
import { StatCounterItem } from '../../core/models/client.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, SectionHeaderComponent, StatsCounterComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  stats: StatCounterItem[] = [];

  leadershipTeam = [
    {
      name: 'Er. Rajesh V. Sharma',
      designation: 'Managing Director & Principal GIS Specialist',
      bio: 'Over 18 years of leadership across national geospatial infrastructure, cadastral surveying, and municipal utility GIS programs.',
      expertise: 'Geodetic Surveying, RTK GNSS, Spatial Databases',
      image: 'assets/images/team/rajesh-sharma.jpg'
    },
    {
      name: 'Er. Amit K. Deshmukh',
      designation: 'Director – Solar Engineering & Turnkey EPC',
      bio: 'Certified Solar Energy Professional with 14+ years of experience leading 100+ MW turnkey commercial and industrial rooftop solar projects.',
      expertise: 'Solar EPC, PVSyst, High-Tension Synchronization, CEIG',
      image: 'assets/images/team/amit-deshmukh.jpg'
    },
    {
      name: 'Er. Priya S. Patil',
      designation: 'Head of Photogrammetry & UAV Remote Sensing',
      bio: 'Specialist in drone LiDAR point clouds, 3D surface modeling, and multi-spectral satellite remote sensing for infrastructure corridors.',
      expertise: 'Drone LiDAR, Orthomosaics, 3D Elevation Modeling',
      image: 'assets/images/team/priya-patil.jpg'
    }
  ];

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.stats = this.clientService.getStats();
  }
}
