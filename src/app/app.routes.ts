import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Home | Arnav Power Solution & Services'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'About Us | Arnav Power Solution & Services'
  },
  {
    path: 'gis-survey',
    loadComponent: () => import('./pages/gis-survey/gis-survey.component').then(m => m.GisSurveyComponent),
    title: 'GIS & Survey Solutions | Arnav Power Solution & Services'
  },
  {
    path: 'solar-solutions',
    loadComponent: () => import('./pages/solar-solutions/solar-solutions.component').then(m => m.SolarSolutionsComponent),
    title: 'Solar Power Solutions | Arnav Power Solution & Services'
  },
  {
    path: 'solar-projects',
    loadComponent: () => import('./pages/solar-projects/solar-projects.component').then(m => m.SolarProjectsComponent),
    title: 'Solar Installations Directory | Arnav Power Solution & Services'
  },
  {
    path: 'solar-projects/:id',
    loadComponent: () => import('./pages/project-details/project-details.component').then(m => m.ProjectDetailsComponent),
    title: 'Solar Project Details | Arnav Power Solution & Services'
  },
  {
    path: 'clients',
    loadComponent: () => import('./pages/clients/clients.component').then(m => m.ClientsComponent),
    title: 'Our Clients | Arnav Power Solution & Services'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact Us | Arnav Power Solution & Services'
  },
  { path: '**', redirectTo: 'home' }
];
