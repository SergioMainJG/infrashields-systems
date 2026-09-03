import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

export interface PartnerLogo {
  id: string;
  name: string;
  // Ruta servida desde /assets (ver src/assets/ y angular.json). Si no hay
  // archivo de logo todavía, se omite y la marca se muestra como mención de
  // texto en vez de imagen.
  image?: string;
  width?: number;
  height?: number;
}

@Component({
  selector: 'partner-carousel',
  imports: [NgOptimizedImage],
  templateUrl: './partner-carousel.html',
})
export class PartnerCarousel {
  readonly partners: PartnerLogo[] = [
    {
      id: 'acronis',
      name: 'Acronis',
      image: 'assets/acronisxinfrashield.jpg',
      width: 240,
      height: 100,
    },
    {
      id: 'kaspersky',
      name: 'Kaspersky',
      image: 'assets/kasperskybadge.png',
      width: 240,
      height: 101,
    },
    { id: 'fortinet', name: 'Fortinet' },
    { id: 'microsoft', name: 'Microsoft' },
    { id: 'google-workspace', name: 'Google Workspace' },
    { id: 'azure', name: 'Azure' },
    { id: 'grandstream', name: 'Grandstream' },
    { id: 'yealink', name: 'Yealink' },
    { id: 'cisco', name: 'Cisco' },
  ];
}
