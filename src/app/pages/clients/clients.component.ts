import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClientService } from '../../core/services/client.service';
import { ClientItem } from '../../core/models/client.model';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  allClients: ClientItem[] = [];
  selectedSector = signal<string>('All');

  filteredClients = computed(() => {
    const sec = this.selectedSector();
    if (sec === 'All') return this.allClients;
    return this.allClients.filter(c => c.sector.toLowerCase().includes(sec.toLowerCase()));
  });

  sectors = ['All', 'Utilities', 'Government & Municipal', 'Industrial', 'Real Estate & Infrastructure'];

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.allClients = this.clientService.getClients();
  }

  setSector(sec: string) {
    this.selectedSector.set(sec);
  }
}
