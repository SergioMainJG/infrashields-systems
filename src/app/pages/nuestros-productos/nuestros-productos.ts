import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { PartnerCarousel } from '../../../partner-carousel/partner-carousel';

@Component({
  selector: 'app-nuestros-productos',
  imports: [PartnerCarousel],
  templateUrl: './nuestros-productos.html',
})
export class NuestrosProductos {
  constructor() {
    inject(Meta).updateTag({
      name: 'description',
      content: 'Descubre las marcas partner de Infrashield Systems para telefonía, cómputo, redes y seguridad.',
    });
  }
}
